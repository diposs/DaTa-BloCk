import { useEffect, useState } from 'react';
import { Title, Container, Text, Button, Input, Group,  Grid, Avatar, rem, Menu, Overlay} from '@mantine/core'
import { IconStack3, IconApi, IconScan} from '@tabler/icons-react'
import { Auth } from '@polybase/auth';
import { ethPersonalSignRecoverPublicKey } from '@polybase/eth';
import { Polybase } from '@polybase/client';
import useStyles from "./header.style";
import { useCollection } from '@polybase/react';


const db = new Polybase({
  defaultNamespace: "pk/0xdc18a8cc9ccb7fc299d07cba29c278bb4b5a5c86cea8eef7a6d6b58f2322f8401cefa1478c9262b9730a32f34cf6c7e529ca337a0f1a50075ce1f4fbd368bbe6/testingplot",
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
    let publicKey: any  = res!.publicKey;

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
      const user = await db.collection('User')!.record(publicKey).get();
      console.log('User', user);
    } catch (e) {
      await db.collection("User").create(["testing"]);
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

    // let datad =  .create(["Big Man Ting",[212,12121,121351346,125125614,453621546256,2546682562,54143,1457157146,15345143,61457256,5,34,518,18,2682362,562457272,457256,2452456], [35673756,4567457457,34574573457,4574573457,345745757,3457457457,345745757,13464,658,5,576,34,3468683569368,2515,657268,379236,25714561,4568,268275,1456157,68268,1516,15268,28671,518,18]]);




    // let datas = await db.collection('waitingRoom').create(['BLUE']);
    // let datass = await db.collection('GlobalEpoch').create(['recents']);
    //const bll = await db.collection('CompilerUser').record("0x2780c505c6554bb306777212a3c2bcca6ded369abb023496a638979c18da622c6cd65405ba4b0fc5f86c31fa9c92658c8e3bdccfb0b9ded8d64d44ebfc33d4b8").call("setPoint",[9]);
    // const bll = await db.collection('DragTest').get();
    // const data = await db.collection('CollectionName').create(['googled']);
    const datas = await db.collection("Testblablabla").record("Big Man Ting").call("trashcollectorEvaluatorList",[db.collection("CompilerUser").record(publicKey)] );
    // const daddy = await db.collection('User').get()
    
   
   console.log('dhhf',datad);
   // console.log('dhhfss',datas);
   // console.log('dhhfed',bll);
  }
  const signingOut = async () => {
    await auth!.signOut()
    setIsLoggedIn(false)
  
  }

  return (
<>
    <Container fluid p={0}>
	<Grid m={0}>
      <Grid.Col span={6} xs={6} sm={6} md={6} lg={1}>1</Grid.Col>
      <Grid.Col className={classes.headerblock} lg={10}>
	  <center>
	  <Menu>
	  <Menu.Target>
	  <Button size="md" variant="gradient" gradient={{ from: '#9C27B0', to: '#110214' }}>Toolbar</Button>
	  </Menu.Target>
	  <Menu.Dropdown>
	  <Menu.Item color= "#551075" icon={<IconStack3 size={48} />}> Compiler</Menu.Item>
		 <Menu.Item color= "#551075" icon={<IconScan size={48} />}> Scan</Menu.Item>
		 <Menu.Item color= "#551075" icon={<IconApi size={48} />}> Api</Menu.Item>
		</Menu.Dropdown>
	  </Menu>
	  </center>
	  </Grid.Col>
      <Grid.Col span={6} xs={6} sm={6} md={6} lg={1} >
	  {isLoggedIn ? (<Button fullWidth  size="md" variant="gradient" gradient={{ from: '#9C27B0', to: '#110214' }} onClick={createNFT}>Login with Wallet</Button>) : (<Button fullWidth size="md" variant="gradient" gradient={{ from: '#9C27B0', to: '#110214' }} onClick={signIn}>Login</Button>)}
	  
	  </Grid.Col>
    </Grid>
	<Grid m={0} >
      <Grid.Col span={1} xs={1} sm={1} md={1} lg={1}></Grid.Col>
      <Grid.Col span={10}>
	  <Container fluid pt='24vh'>
		  <Title size="5rem" weight={900}>
				A{''}<Text size="5rem" weight={900} variant="gradient"
                span inherit gradient={{ from: '#9C27B0', to: '#110214' }}> searchable NFT media database</Text>{' '}with a decentralised compilation.
      </Title>
		  
		  </Container>
		  <Container fluid pt='10vh'>
		  <Grid m={0} >
		  <Grid.Col span='auto'><Text fz="xl">  About a searchable NFT database with a decentralised compilation. Main components that users should expect to work with are Compiler, Scan, API..</Text> 
			  </Grid.Col>
      <Grid.Col span='auto' ><Text fz="xl">  About a searchable NFT database with a decentralised compilation. Main components that users should expect to work with are Compiler, Scan, API..</Text> 
		  </Grid.Col>
		  </Grid>
		  </Container>
		  <Container pt='20vh'>
		  <Grid m={0} >
		  <Grid.Col span={2} >
	   <IconStack3  color='black' size='10vh' />
		  </Grid.Col>
		  <Grid.Col span={10} >
		  <Text fz="xl">  About a searchable NFT database with a decentralised compilation. Main components that users should expect to work with are Compiler, Scan, API..</Text> 
		  </Grid.Col>
		  <Grid.Col span={2} pt='10vh' >
	   <IconApi  color='black' size='10vh' />
		  </Grid.Col>
		  <Grid.Col span={10} pt='10vh' >
		  <Text fz="xl">  About a searchable NFT database with a decentralised compilation. Main components that users should expect to work with are Compiler, Scan, API..</Text> 
		  </Grid.Col>
		  <Grid.Col span={2} pt='10vh' >
	   <IconScan  color='black' size='10vh' />
		  </Grid.Col>
		  <Grid.Col span={10} pt='10vh' >
		  <Text fz="xl">  About a searchable NFT database with a decentralised compilation. Main components that users should expect to work with are Compiler, Scan, API..</Text> 
		  </Grid.Col>
		  </Grid>
		  </Container>
	  </Grid.Col>
      <Grid.Col span={1} xs={1} sm={1} md={1} lg={1}>	  
	  </Grid.Col>
</Grid>
</Container>

		  </>
		  
  )
}