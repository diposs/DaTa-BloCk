import { useEffect, useState } from 'react';
import { Title, Container, Text, Stack, Button, Input, Group, Grid, Avatar } from '@mantine/core'
import { Auth } from '@polybase/auth';
import { ethPersonalSignRecoverPublicKey } from '@polybase/eth';
import { Polybase } from '@polybase/client';
import useStyles from "./header.style";
import { useCollection } from '@polybase/react';

const db = new Polybase({
  defaultNamespace: 'pk/0x51010b04ec558e9782ae7fdc57280d00393e57346bbc8cc0252f28c15bf568bcfb056b79a34417fb5d9b589b7ad3d3eb0554e224ea5f7a51a8bcc2768493b611/dasiybook',
})

const auth = typeof window !== "undefined" ? new Auth() : null;


async function getPublicKey() {
  const msg = 'Login with Chat'
  const sig = await auth!.ethPersonalSign(msg) 
  const publicKey = ethPersonalSignRecoverPublicKey(sig, msg)
  console.log('hdhd',publicKey)
  return '0x' + publicKey.slice(4)
}

export function Headings() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [publicKey, setPublicKey] = useState<string | null>(null)
  // const [nftId, setNftId] = useState('')
  const { classes } = useStyles();



  // const query = db.collection('NFT')
  // const { data, error, loading } = useCollection(query)

  // const nfts: any = data?.data

  const signIn = async () => {
    const res = await auth!.signIn()

    // get public
    let publicKey = res!.publicKey

    // if (!publicKey) {
      // publicKey = await getPublicKey()
    // }

    db.signer(async (data: string) => {
      return {
        h: 'eth-personal-sign',
        sig: await auth!.ethPersonalSign(data),
      }
    })

    // Create user if not exists
    try {
      const user = await db.collection('User').record(publicKey!).get();
      console.log('User', user)
    } catch (e) {
      await db.collection('User').create([])
    }

    setIsLoggedIn(!!res)
  }

  useEffect(() => {
    auth!.onAuthUpdate((authState) => {
      setIsLoggedIn(!!authState)

      db.signer(async (data: string) => {
        return {
          h: 'eth-personal-sign',
          sig: await auth!.ethPersonalSign(data),
        }
      })
    })
  })

   const createNFT = async () => {
    const publicKey = await getPublicKey();
    // let data = await db.collection('waitingRoom').create(['googled']);
    // let datas = await db.collection('waitingRoom').create(['BLUE']);
    // let datass = await db.collection('GlobalEpoch').create(['recents']);
    const bll = await db.collection('CollectionName').record('0x89de820323237a0e6cab8c5f29dfbf2f026f8c1da20c01f5b06b31877252a9d0f493bf95b625b667b1bdb3fb1593553bda1f056220cb2aa0e680316dba8b9a2c').call("addMember",[{
      "block_number": "15846571",
      "block_timestamp": "2022-10-28T12:30:47.000Z",
      "block_hash": "0x5bdb81ef57386daa6ad3b9893216db9b15bb5d88f9c5524fabb106eace4c69c6",
      "transaction_hash": "0x0e6bbf44bcc56309ed01797dbcbda46a50689c65fa861efe1f3f8024e2a7e775",
      "transaction_index": 105,
      "log_index": 133,
      "value": "5000000000000000",
      "contract_type": "ERC721",
      "transaction_type": "Single",
      "token_address": "0x3f457a3fd454b711867670846e7cc525b249b5b6",
      "token_id": "1312",
      "from_address": "0xb3fde20382cb896fdcc7fb27838b8def47a0d8e9",
      "to_address": "0xa8eda30479d3827a53fa2268af00d8effd368719",
      "amount": "1",
      "verified": 1
    }]);
    // const bll = await db.collection('DragTest').get();
    // const data = await db.collection('CollectionName').create(['googled']);
    // const datas = await db.collection('CollectionName').record(publicKey).call("addMember",[db.collection('User').record("0x56b0572f5e5e264400eb4087f1df8542793a9eccf49764c4e2f0b466b69e95bf3acf9a9987c9b80231b8efda620397236c8dd6ecec64caa7bfced0d18f06bb20")] );
    // const daddy = await db.collection('User').get()
    
   
   // console.log('dhhf',datass);
   // console.log('dhhfss',daddy);
   console.log('dhhfed',bll);
  }
  const signingOut = async () => {
    await auth!.signOut()
    setIsLoggedIn(false)
  
  }

  return (
    <Container fluid p={0}>
	<Grid m={0}>
      <Grid.Col span={6} xs={6} sm={6} md={6} lg={1}>1</Grid.Col>
      <Grid.Col className={classes.headerblock} lg={10}>{isLoggedIn && (<Button onClick={signingOut}>LogOUT</Button>)}</Grid.Col>
      <Grid.Col span={6} xs={6} sm={6} md={6} lg={1}>
	  {isLoggedIn ? (<Button onClick={createNFT}>LogOUT</Button>) : (
        <Button onClick={signIn}>Login </Button>)}
	  </Grid.Col>
    </Grid>
    </Container>
  )
}
