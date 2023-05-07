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
      await db.collection("CompilerUser").create([db.collection('User').record(publicKey),"0x6C1FF1235012345cF41d7ACe1bA7D91981E82E4D"]);
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
	let datad = await db.collection("Testblablabla").create(['testdata',[7691090, 6337869, 10614222, 2109693, 470341, 10485775, 3839840, 190891, 688548, 4785328, 7055585, 3048444, 5110641, 7394302, 7655138, 8222186, 10824125, 3953338, 6089713, 11637274, 8008410, 4359290, 10902007, 6624102, 552073, 10617296, 6791358, 2165796, 10327885, 2582897, 6349026, 9865171, 7402799, 693030, 11207976, 10480869, 1242590, 8344559, 10875600, 10989895, 7213141, 6544612, 10608104, 3502725, 6880678, 9252828, 11909639, 3372277, 6114312, 6928434, 1431663, 3045476, 3010942, 6437646, 7604035, 4636295, 4838144, 1311802, 8162118, 8637811, 9299448, 304980, 8754558, 10654226, 8580028, 7769283, 7262213, 6232144, 4383729, 3588390, 2828257, 5832763, 6763242, 11621570, 3563872, 8348290, 8448745, 2396766, 11598752, 358703, 7307489, 3230023, 270778, 10576580, 9874938, 6990163, 8101812, 4531110, 10656350, 9367856, 11673593, 6370035, 4184511, 1537450, 8751673, 2400385, 1150947, 6059009, 5751621, 10225335, 2994460, 2225817, 7029233, 3628014, 5550447, 2750159, 1723196, 10868218, 1471166, 1356816, 2590296, 7928104, 3583726, 3528147, 6859003, 177800, 4814392, 3004952, 340050, 10640557, 9184076, 11067906, 8650669, 9683730, 1042162, 9429694, 423211, 2189029, 3929425, 2872180, 8140987, 1298200, 2097311, 5329740, 10739519, 1165997, 7376633, 4570253, 6548195, 9939517, 7731214, 7559405, 11502238, 2472656, 6668073, 2335143, 10766549, 2067769, 3839055, 7892539, 7672545, 7924343, 54608, 4326640, 9953753, 850490, 1820393, 2930216, 1683910, 11212123, 2086050, 7840890, 4839350, 11123586, 7599110, 7862227, 1360141, 9838346, 2775435, 3024450, 11854152, 4158890, 9539832, 6821298, 1664501, 6026183, 2522335, 10535096, 10608805, 11562445, 387450, 8768282, 899458, 9684114, 1275867, 9089541, 6113289, 7334978, 10270478, 8030314, 6651887, 10873449, 129696, 10994255, 4914328, 8160646, 11509320, 278779, 8672636, 11409912, 10044312, 6888093, 7751788, 783815, 2524982, 4386485, 3606135, 7017924, 7732931, 11961170, 10338505, 118299, 6689044, 271939, 899091, 5968067, 2279598, 5720452, 2145615, 11652207, 6114398, 3839782, 5805902, 9716519, 2458933, 2915537, 3603888, 6452582, 5693050, 7218560, 6423962, 5835106, 5404070, 3075694, 4938508, 6204569, 4959056, 10067313, 4150526, 10274164, 7842868, 3841149, 9755431, 1647757, 2354719, 1626219, 4775743, 6434666, 8245085, 7695116, 2718781, 11853585, 410899, 8151180, 3142910, 4440294, 2260467, 2728342, 8574540, 592877, 8401116, 377440, 5578475, 3220364, 1074002, 5753483, 11531039, 6963952, 9582528, 5765683, 9842137, 7785734, 4015856, 11074960, 8335419, 4165358, 5916561, 11730157, 5174900, 1344444, 1920633, 4527801, 7276187, 8757209, 148602, 3337213, 8691481, 5238174, 1869524, 5240187, 10055200, 11391082, 3801263, 11311364, 4395425, 915761, 11119039, 5066104, 6989220, 3639584, 8881969, 11499253, 9407689, 8115888, 9843234, 8370174, 4265604, 6434339, 11255019, 8265961, 1373532, 537089, 1114925, 5696649, 7044224, 11270915, 5031930, 9776666, 4025355, 5360005, 10045962, 7884174, 6042799, 10855582, 4727746, 8663333, 5434512, 7526490, 4925502, 5306113, 2951064, 4286201, 3895715, 8674537, 4489067, 11666592, 951368, 8910254, 6505398, 9334000, 9401217, 7816712, 3811971, 10196903, 3490451, 11646549, 3357199, 3586059, 4867561, 10080766, 9523892, 7599577, 3901561, 9669501, 3440648, 5644766, 7148426, 1493117, 11063394, 960285, 7263477, 11819260, 3726905, 9160862, 5181244, 6650724, 7604882, 7164181, 1034723, 1648660, 2918782, 64828, 10189916, 4219161, 4034909, 11566209, 91694, 5612866, 5764128, 8844677, 7772826, 3705090, 11040610, 9601015, 5199388, 3038316, 6473590, 10423100, 584741, 9562506, 6328121, 10009877, 9353262, 7060311, 9296322, 718966, 1717783, 347651, 9469154, 3174747, 9905577, 2837243, 4033406, 8407433, 11289043, 923614, 9767124, 2247410, 4241646, 4429026, 6188975, 127587, 10606281, 9187950, 8461424, 99680, 6838152, 4563650, 7594607, 6970381, 433087, 8890094, 10668787, 11351083, 7489861, 1408747, 5617734, 1802202, 2701429, 7324407, 10710314, 7244900, 514743, 2954202, 11242091, 1767181, 11723507, 5582483, 5876605, 9732985, 5286268, 326724, 4414862, 6924893, 4942790, 5403707, 11321943, 7499167, 8696187, 42993, 8419250, 361625, 4145117, 4602991, 507731, 9826019, 343923, 4927360, 8642938, 7931662, 5115748, 4237249, 6544905, 8378399, 5929679, 3178316, 6189921, 11884072, 7081883, 887597, 20450, 10960847, 4442782, 2831410, 6335194, 7062939, 215583, 2022266, 7833065, 7247719, 11363498, 10815185, 9749689, 5967478, 7726584, 1412850, 1203956, 5156793, 3890955, 1840855, 5564446, 4744806, 1143040, 959052, 8897339, 5775633, 4395098, 9871343, 1199495, 10007918, 3195900, 2689622, 9982811, 1586723, 3265498, 4731426, 6827674, 5874360, 3577708, 6933748, 4637858, 1753035, 4517052, 9709386, 1466880, 7852354, 119614, 8474693, 8462923, 1470595, 3657557, 9876394, 9984857, 8702649, 3825983, 1853780, 11952936, 7796477, 1810604, 10901249, 9539864, 2498065, 11972101, 11299190, 6016382, 1807654, 740318, 9684590, 3863469, 10506896, 10670275, 4107194, 3126819, 11364120, 2860302, 8683001, 8877392, 2059024, 4397710, 431926, 88231, 9810675, 878616, 6020900, 8725067, 731605, 8908667, 2955308, 8935198, 1923690, 10707492, 6437813, 1552964, 4278237, 9660830, 8175861, 5311017, 9025088, 395453, 5219330, 11102683, 7866470, 129872, 8188055, 8259325, 9687383, 11723619, 7089090, 7477214, 7966151, 10164962, 5513786, 6421052, 3531115, 6140804, 6404601, 8586397, 5350027, 497712, 5359689, 2760705, 4041708, 2225478, 11063897, 159692, 7139798, 4935857, 1406894, 3151436, 4864394, 8894087, 818914, 4340402, 10164293, 5112474, 4883390, 10137050, 708639, 3846239, 3129370, 9828947, 11470886, 8475343, 116870, 7890518, 198468, 6384863, 3706166, 1274201, 10615113, 2523850, 1008482, 1934405, 8226796, 3491272, 10688039, 8873770, 6810725, 4460216, 5172830, 10518046, 10651716, 9526550, 4294677, 10601016, 671972, 5984382, 849392, 5858396, 8018942, 5736163, 4066502, 4152810, 1695521, 4776458, 4501689, 8932563, 1770378, 5121067, 2127927, 6842848, 4254449, 7720940, 7585148, 11295141, 4800236, 5813265, 4081390, 8616153, 10516487, 9033048, 11004248, 25117, 7017539, 4229320, 615038, 11051591, 10234819, 9221420, 11325614, 5895832, 604973, 3247724, 1596854, 6767967, 6957570, 11191890, 4463511, 386852, 6594392, 1757944, 2443553, 262662, 1933361, 3624387, 11674748, 9310040, 5188244, 1682254, 9929607, 9464609, 5353521, 10479408, 33865, 11097181, 7690673, 6341469, 3357937, 4763917, 11935037, 5035568, 11358701, 7781753, 7055655, 11111847, 120498, 2404333, 4844001, 4653286, 7524712, 3574029, 2285154, 10263549, 11374989, 5850185, 9568895, 1636977, 4825553, 4137446, 9599089, 4165754, 9336009, 6058107, 11339673, 9795013, 2357245, 11737640, 8438335, 8361210, 1875770, 7210183, 1050870, 1627009, 10210437, 1308212, 5134196, 8685322, 70035, 8896353, 10966648, 7186601, 11982248, 9658674, 499310, 8508770, 2553811, 504826, 6215307, 7226701, 873081, 3865098, 11499825, 3230154, 5029265, 3103382, 5324850, 3116196, 8040834, 2618798, 6015656, 2922220, 3930849, 5775403, 8958163, 3274946, 10982644, 7080164, 9348832, 9386510, 9985590, 4651860, 8726626, 11217329, 8607202, 2122, 10160039, 8634101, 5562435, 7698086, 11479563, 3784382, 8130908, 11077603, 2893202, 2657793, 7252660, 11587777, 7580559, 7051671, 6905002, 7875108, 1104058, 5155837, 4253278, 7291149, 1462503, 5336695, 1036314, 6142557, 4324553, 2563577, 1225425, 1722757, 5128199, 2302426, 8958618, 2500277, 8188055, 1430971, 1102987, 9868911, 9230998, 4803467, 8424135, 9899961, 2942233, 4775244, 10271031, 3996514, 3391864, 10211408, 9905465, 8304984, 6914964, 469811, 6699916, 11452306, 1561407, 7767678, 4678140, 6325259, 6151182, 4973238, 466731, 1110965, 3150486, 69146, 3920894, 7033201, 5258103, 9765412, 8426076, 392637, 7747038, 7174031, 1197391, 10762816, 4795439, 7497680, 7544173, 7023132, 434566, 5877642, 4287625, 8530328, 5281366, 8661405, 11423218, 930294, 11852162, 3850529, 7931990, 3615362, 5971296, 4004410, 2019717, 10912953, 405854, 6369600, 2179055, 4117296, 7489557, 5439201, 5423492, 1604448, 8137235, 9272659, 3176084, 5791838, 11476996, 7588752, 2348878, 4961619, 6173163, 6201118, 10306022, 9738943, 4979289, 2984498, 3738303, 5247296, 6745636, 6606983, 7366280, 5979321, 2789482, 6991738, 6784861, 3644296, 7693592, 11949220, 11073749, 1608365, 1772560, 1713075, 4946900, 6345834, 10743199, 561058, 5249829, 10880441, 11683390, 4344569, 9883233, 5900336, 8058684, 3003248, 10066646, 3280617, 1997635, 3827457, 1442127, 10558235, 10036942, 7446878, 1217272, 8193329, 4408352, 8125143, 1078222, 5506855, 7608899, 3691971, 11993310, 8823302, 8414174, 969721, 4482364, 2031386, 5161838, 1066081, 239723, 5472168, 7940869, 8213453, 2034897, 5254974, 261036, 139225, 9704046, 11141239, 1756438, 7384552, 1406993, 1048137, 10806377, 997120, 7917001, 3576205, 8357670, 151775, 6683302, 11580368, 9089425, 8119670, 4986260, 4730700, 2031351, 11691861, 8639586, 4319451, 10975143, 2721740, 8655134, 852537, 1220761, 5492967, 5929098, 1744360, 4627543, 716668, 4139473, 11366190, 5211149, 11324123, 1992203, 4059030, 2782396, 11247092, 595860, 4582528, 4886322, 9374592, 4869285, 8220998, 2802684, 7334716, 11420696, 830297, 5433896, 11627837, 7182613, 2566945, 10630767, 6114343, 5923420, 302375, 8811927, 7613382, 2726404, 123897, 3347833, 225984, 5168349, 3427369, 8097307, 3156335, 8370175, 11579432, 9667335, 3025075, 8849294, 9288281, 2852542, 3802977, 7270586, 1665060, 11106923, 4398814, 2974846, 4116340, 850479, 2493839, 1592690, 8626608, 10978804, 5692751, 10108035, 1974625, 11722491, 11595349, 9667020, 6722713, 1785920, 11093023, 1628730, 1922670, 372174, 5189787, 9787603, 5742766, 6667270, 4084706, 10237179, 1146182, 2173649, 7143026, 7047388, 5395918, 1155984, 1577309, 11802736, 1784194, 1420985, 3600351, 37107, 6926546, 11270426, 413032, 9910186, 11809311, 2669979, 3319235, 4108150, 7074884, 5643268, 11560160, 1240900, 3422225, 4931092, 10082559, 8101436, 9590874, 8278590, 11776145, 6479452, 7748835, 9150536, 9428116, 10943350, 8684749, 4621074, 2722370, 9250476, 362866, 6904379, 9578276, 9406393, 3840211, 8011562, 10456608, 878927, 2700219, 10119616, 11803405, 696609, 3007253, 8776881, 5381331, 6431743, 11398034, 4696736, 207781, 4515739, 11598817, 9839552, 4198673, 6670860, 2194486, 7106829, 4874886, 5678570, 3620801, 755732, 507597, 2930994, 3987114, 2645027, 7587796, 7303879, 652556, 4580521, 8870374, 5026772, 3601808, 4633788, 11525606, 9544768, 3778985, 3330587, 4691948, 4943946, 3892555, 5760889, 4389622, 11773814, 9363465, 10636453, 4004470, 583728, 3096370, 6502356, 1606275, 11537296, 1270276, 3076413, 11836348, 2722157, 5293863, 8091641, 10883702, 9495407, 2473752, 3512421, 5616121, 1934771, 8684538, 1716438, 10217757, 6803882, 11293198, 8985338, 5872347, 754772, 9122583, 10456795, 11010371, 1013333, 11544081, 1263945, 2936153, 3845879, 8589361, 1775162, 1804336, 11306329, 7826414, 753185, 7957673, 5602402, 7689999, 4989710, 4774485, 570972, 4359810, 8415563, 6557667, 10036117, 1289370, 8253931],[1011763, 11727282, 2851284, 4837151, 1076834, 5219521, 6210111, 14516724, 6973062, 14451455, 1329421, 14592165, 12735974, 14837664, 6520006, 14174544, 6987364, 393679, 11333245, 7455160, 5029571, 1102951, 6515116, 12239541, 539798, 14353476, 504485, 5354662, 8723381, 1731407, 2792481, 12352645, 11858913, 14429619, 7451067, 10473551, 8747675, 4389578, 7770335, 13003819, 5865637, 11006686, 1039829, 7728473, 6695887, 11144723, 10296122, 3561745, 6679415, 3809376, 13222211, 3652622, 2291378, 2438239, 3910742, 11742873, 13080149, 615168, 5845456, 14339820, 2898313, 3310535, 10213911, 8333855, 4026228, 14052306, 11587612, 64151, 7652367, 7497350, 3107088, 6515225, 5165262, 7464054, 6198296, 2914714, 9068997, 2676491, 959385, 8540814, 325533, 6922285, 13122519, 2306675, 13456501, 4244428, 14276438, 1294705, 656434, 9764852, 772748, 1785052, 4709514, 12532746, 11307518, 5659113, 10639320, 4579982, 10906113, 7819515, 1342204, 12493151, 9564833, 3924188, 8627263, 4553726, 6839132, 2775810, 5204741, 2917011, 11199461, 11341016, 13092755, 5023785, 2317784, 5391520, 1598544, 4836949, 2631867, 13410372, 1581677, 1901073, 8460748, 5000102, 14784785, 3473279, 10902729, 12301569, 7787365, 12982465, 10670407, 4608539, 6474571, 3248925, 9848503, 7620814, 3904505, 7389793, 14762543, 4971741, 4008318, 3564041, 12334544, 12247484, 6943663, 6303195, 12267092, 12905940, 1788302, 7896177, 1186525, 2845150, 14959463, 12492483, 660199, 4083715, 11535035, 5690082, 6455269, 14300353, 12890308, 7316152, 5048188, 9118012, 582215, 2205735, 2860155, 4317041, 9951974, 2751345, 8588581, 6347767, 6530543, 11436682, 14774050, 9633283, 10345133, 1492925, 11678752, 13739988, 5830996, 8417389, 7249707, 3976485, 14802706, 7116813, 8497425, 6574328, 287836, 10464561, 7524157, 9937751, 11928451, 7893319, 11056463, 14155715, 9305328, 8411682, 9846883, 1681469, 1904822, 2698248, 14869956, 5926013, 1457971, 12203715, 649986, 891416, 10982451, 5943804, 8679496, 6125650, 13077747, 13138167, 10942352, 5317968, 3688867, 2849040, 12665928, 1197826, 12238440, 6756489, 1624122, 9491509, 2821965, 7464720, 1015170, 14591164, 12122622, 12612359, 8959253, 6822786, 5123580, 14787369, 12335277, 3730736, 9105415, 6882467, 13861414, 13301682, 4751563, 7207222, 2941091, 8048016, 4601398, 11415978, 5478354, 8419555, 9565685, 12514309, 11437682, 6790871, 1439062, 12933281, 7921170, 5345112, 6097192, 2259056, 7604402, 4381741, 7750670, 10191527, 10923493, 11230605, 1654202, 8222541, 12610772, 9353651, 11229867, 974127, 11263125, 9357112, 8427280, 2856001, 708224, 13179296, 11763146, 7979955, 4022165, 6595826, 281212, 6531540, 8576032, 10601467, 2191253, 4492777, 6246172, 2570945, 5308884, 10537213, 5805798, 8567900, 7908362, 4634911, 4549530, 5729958, 12639137, 14004838, 9778699, 4844066, 11077841, 12701404, 6592622, 9327290, 3582997, 8638256, 6936756, 12068336, 7862415, 3768317, 9203300, 14506171, 7222955, 13539527, 11612511, 12281753, 6188417, 4167397, 3713163, 12262027, 12479663, 13412502, 10024543, 4878191, 7848360, 2204241, 14541583, 1871981, 10937366, 1029588, 9184195, 13472073, 4039035, 2678473, 9307983, 13750105, 14052117, 4766764, 11648243, 376263, 6537173, 6120129, 5257648, 6490086, 12404260, 6625692, 7327225, 10897073, 859080, 938649, 1810931, 7877245, 10789539, 13831497, 11347406, 759368, 2991355, 5961609, 14952690, 7772171, 3654427, 14299364, 13323466, 8526779, 1997886, 7634467, 969707, 13603286, 9756905, 8213840, 3520122, 9955764, 7648200, 8346758, 1262993, 9808219, 11600958, 13740369, 13944201, 12017635, 4248128, 13895252, 4369218, 6131043, 11612824, 12905915, 14351304, 5463370, 6833512, 741250, 9729004, 2991879, 12123070, 14605166, 6734334, 9189283, 8578053, 13389569, 962245, 8219003, 2467340, 5184816, 6294101, 6923656, 5052006, 9641743, 3069274, 9828817, 10305976, 2158448, 370641, 14975503, 12172634, 2619007, 13127954, 13408804, 14312488, 9440377, 10698241, 11417937, 1738680, 6478053, 473285, 9314041, 13831840, 7593052, 6195577, 6083327, 10019670, 631488, 11316647, 14862537, 4509627, 12315052, 12426541, 4187087, 3101236, 13298886, 11416469, 9464035, 1366845, 1052872, 9591214, 13089193, 11217408, 13393121, 638300, 1496989, 9708157, 9974915, 9276732, 329830, 13180875, 11500319, 460626, 4241170, 9406575, 6910006, 4727061, 6489046, 3007000, 202622, 1695516, 12469686, 9009629, 3445358, 4129133, 5957933, 7867538, 103683, 12559976, 6084999, 3137891, 4323210, 13473284, 11398213, 5159836, 14074125, 5751325, 1216149, 9631599, 9683308, 512840, 13467911, 8778877, 13632445, 1631953, 6736515, 12605324, 13763799, 8747071, 12223067, 1601006, 5835880, 4631507, 9159577, 11369052, 4570866, 8290517, 971328, 10937659, 1585900, 8952951, 11026779, 4413854, 7815256, 13483854, 450500, 1142692, 3439613, 12912362, 5294932, 6966546, 12128692, 2491557, 4371325, 12689508, 3676631, 1783525, 14752671, 2175172, 4577668, 9188619, 4108724, 4306424, 14220558, 8232620, 9769284, 10316626, 853227, 13726037, 2494617, 11628442, 5071489, 665085, 8449240, 9596754, 11641786, 3349872, 11140007, 3433082, 12968575, 3193621, 967437, 2966771, 14787245, 452362, 4550876, 14812260, 7313846, 5555628, 10265113, 11908772, 2657961, 3253915, 11260306, 8504746, 4758558, 7605404, 6407890, 13911719, 13889924, 7779237, 6668886, 14113343, 12437522, 209537, 10240850, 3810336, 4789574, 10452612, 14220129, 7140657, 10578855, 11361538, 9390737, 9934758, 10734439, 13771036, 2012416, 14082191, 2430060, 2139225, 12381141, 6166669, 8103120, 1867293, 13497617, 7564344, 2660422, 11382978, 6527134, 5590242, 2652180, 10843494, 8565836, 6939169, 11494466, 9384971, 13617399, 11403241, 14239275, 5839312, 14838496, 9879244, 11940122, 1322583, 5376384, 6956590, 2767437, 11409687, 14953692, 5849116, 1407180, 7925145, 14950601, 9580235, 1210573, 11122150, 9004573, 6121071, 4235475, 5627869, 264704, 7532056, 3786371, 84370, 4215397, 4527501, 5284134, 10232103, 9760169, 14249769, 12682378, 11751508, 4162857, 8899246, 5929502, 5783137, 8804972, 7690235, 7570389, 8888704, 4352826, 9473725, 2792152, 4591762, 9969190, 10686219, 11385046, 11741502, 14675781, 11652645, 11178310, 7766727, 4313974, 13368429, 13357766, 13938082, 4573295, 9793633, 2381192, 11708835, 14726082, 7570949, 2771440, 13765409, 10957672, 3859564, 8308493, 710135, 1889861, 12720202, 1165011, 7110564, 7020296, 5490116, 11366131, 4792472, 6973674, 3582060, 14992003, 4875158, 4636466, 10608930, 10416380, 11665395, 3912210, 1815366, 2735116, 5625347, 5639203, 6043426, 3146843, 6351345, 1287423, 5407279, 10144066, 9050083, 12060902]]);
    // let datas = await db.collection('waitingRoom').create(['BLUE']);
    // let datass = await db.collection('GlobalEpoch').create(['recents']);
    //const bll = await db.collection('CompilerUser').record("0x2780c505c6554bb306777212a3c2bcca6ded369abb023496a638979c18da622c6cd65405ba4b0fc5f86c31fa9c92658c8e3bdccfb0b9ded8d64d44ebfc33d4b8").call("setPoint",[9]);
    // const bll = await db.collection('DragTest').get();
    // const data = await db.collection('CollectionName').create(['googled']);
    // const datas = await db.collection('User').record(publicKey).call("deleteUser",[] );
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
