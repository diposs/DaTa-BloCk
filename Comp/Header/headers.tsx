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
  const sig = await auth.ethPersonalSign(msg)
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
    const res = await auth.signIn()

    // get public
    let publicKey = res.publicKey

    // if (!publicKey) {
      // publicKey = await getPublicKey()
    // }

    db.signer(async (data: string) => {
      return {
        h: 'eth-personal-sign',
        sig: await auth.ethPersonalSign(data),
      }
    })

    // Create user if not exists
    try {
      const user = await db.collection('CollectionName').get();
      console.log('User', user)
    } catch (e) {
      await db.collection('User').create([])
    }

    setIsLoggedIn(!!res)
  }

  useEffect(() => {
    auth.onAuthUpdate((authState) => {
      setIsLoggedIn(!!authState)

      db.signer(async (data: string) => {
        return {
          h: 'eth-personal-sign',
          sig: await auth.ethPersonalSign(data),
        }
      })
    })
  })

   const createNFT = async () => {
    const publicKey = await getPublicKey();
    // let data = await db.collection('waitingRoom').create(['googled']);
    // let datas = await db.collection('waitingRoom').create(['BLUE']);
    // let datass = await db.collection('GlobalEpoch').create(['recents']);
    const bll = await db.collection('CollectionName').record(publicKey).call("updateHeartbeat",["ble",db.collection('GlobalEpoch').record('recents')]);
    // const bll = await db.collection('DragTest').get();
    // const data = await db.collection('CollectionName').create(['googled']);
    // const datas = await db.collection('CollectionName').record(publicKey).call("addMember",[db.collection('User').record("0x56b0572f5e5e264400eb4087f1df8542793a9eccf49764c4e2f0b466b69e95bf3acf9a9987c9b80231b8efda620397236c8dd6ecec64caa7bfced0d18f06bb20")] );
    // const daddy = await db.collection('User').get()
    
   
   // console.log('dhhf',datass);
   // console.log('dhhfss',daddy);
   console.log('dhhfed',bll);
  }
  const signingOut = async () => {
    await auth.signOut()
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
