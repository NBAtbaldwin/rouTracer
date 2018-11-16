# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'open-uri'
require 'open_uri_redirections'

User.destroy_all
Route.destroy_all
Activity.destroy_all
Friendship.destroy_all
Comment.destroy_all


def adjective
  text=File.readlines("synonyms.txt").each do |line|
    line = line.delete("/n")
  end
  text.sample
end

def workout_quote
  text=File.readlines("workout-quotes.txt").each do |line|
    line = line.delete("/n")
  end
  text.sample
end

def workout_synonym
  text=File.readlines("workout-synonyms.txt").each do |line|
    line = line.delete("/n")
  end
  text.sample
end

def gen_route_name
  text=File.readlines("cool-synonyms.txt").each do |line|
    line = line.delete("/n")
  end
  adj = text.sample
  "My #{adj} route"
end

def username_password
  name = Faker::Name.middle_name
  fruit = Faker::Food.fruits
  "#{name} #{fruit}"
end

def gen_name
  Faker::Name.name
end

def activity_type
  num = rand(2)
  num == 1 ? "biking" : "running"
end

def gen_activity_name
  adj = adjective
  workout = workout_synonym
  "#{adj} #{workout}"
end

def gen_dist
  rand(51)
end

def gen_elev
  rand(1001)
end

def gen_dur(route)
  rand(4001)
end

def gen_dates
  output = []
  i = 0
  40.times do
    str = "#{(Date::today-i).year}-#{(Date::today-i).month}-#{(Date::today-i).day}"
    output.push(str)
    i += 1
  end
  output
end

def gen_comment
  Faker::Lorem.sentence
end

dates = gen_dates

user_hash = {}

demo_user = User.create(email: "user@example.com", password: "demouser", name: "Demo User" )

photo_url = Faker::LoremFlickr.image("400x400", ['sports', 'fitness'])
url = URI.parse(photo_url)
file = open(url, :allow_redirections => :safe)
demo_user.photo.attach(io: file, filename: "temp-photo.#{file.content_type_parse.first.split("/").last}", content_type: file.content_type_parse.first)

(0..20).to_a.each do |num|
  usr_eml = username_password

  user_hash[num] = User.create(email: usr_eml, password: usr_eml, name: gen_name )

  photo_url = Faker::LoremFlickr.image("400x400", ['sports', 'fitness'])
  url = URI.parse(photo_url)
  file = open(url, :allow_redirections => :safe)
  user_hash[num].photo.attach(io: file, filename: "temp-photo.#{file.content_type_parse.first.split("/").last}", content_type: file.content_type_parse.first)

end


friendship_hash = {}
statuses = ['pending', 'accepted']

(1..100).each do |num|
  requester_id = user_hash.values.sample.id
  requestee_id = user_hash.values.sample.id

  while requestee_id == requester_id
    requester_id = user_hash.values.sample.id
    requestee_id = user_hash.values.sample.id
  end

  while friendship_hash.keys.include?([requestee_id, requester_id].sort)
    requester_id = user_hash.values.sample.id
    requestee_id = user_hash.values.sample.id
  end

  friendship_hash[[requestee_id, requester_id].sort] = Friendship.create(requester_id: requester_id, requestee_id: requestee_id, status: statuses.sample)

end

demo_user_friendship_hash = {}

(1..15).each do |num|
  user_id = demo_user.id
  other_id = user_hash.values.sample.id

  id_arr = [user_id, other_id]
  requestee_id = id_arr.sample
  requestee_id == user_id ? requester_id = other_id : requester_id = user_id

  while demo_user_friendship_hash.keys.include?([requestee_id, requester_id].sort)
    other_id = user_hash.values.sample.id
    id_arr = [user_id, other_id]
    requestee_id = id_arr.sample
    requester_id = id_arr.sample

    while requestee_id == requester_id
      requestee_id = id_arr.sample
      requester_id = id_arr.sample
    end
  end

  demo_user_friendship_hash[[requestee_id, requester_id].sort] = Friendship.create(requester_id: requester_id, requestee_id: requestee_id, status: statuses.sample)

end

# user_hash[rand(21)].id

route1 = Route.create(
  route_name: gen_route_name,
  activity_type: "WALKING",
  coordinates_list:
  "ulzwFdn_bMqEaG_@c@SM[MeBQkCUo@Gg@MmAc@{As@wL_HkKcGme@}XQIDQaAg@mBe@Y?P?M?EhBA|GDp@TbAbAbDDJ{@j@kD~BkAv@c@ReAd@a@DyADOBMHGNA\\?nDAzAGh@Od@QXWZQJi@L}@@mB?_@C[[EKAwAAMAECCKAo@?OCGECoD?c@?QE?w@@CCACAk@GQKEYAq@CAm@EMQEYAyBACmAE}@E_@ISUSq@[_AYoBDg@ASIYMCCEC?{F@oCHmAp@sANS`@_@ZQ^Q~@W`@I`@KAQFKEqAGq@Ms@K}@A_AbAyLh@uFTkA\\cA~@kBrFqIbA}Az@i@|@OfAQ?[Hu@l@N~Df@`Bv@tCd@x@H^Cn@OdBe@fB]`@QJIL[PuAFkBGjBQtAMZKHa@PgB\\eBd@o@N_@By@IuCe@aBw@_Eg@_@IEZCl@x@MfAM`@@h@NTN\\\\^~@PrAt@dILp@d@v@NLp@Tn@Jd@@\\Gr@Wz@_@h@Od@C\\B\\DZP\\Xb@h@Zf@Rj@Lp@HdABf@bABK~AMbB@^DZ?NuAjJGLYBKJA\\BHd@XIz@H{@e@YCI@]JKXCFMtAkJ?OE[A_@LcBHmAaACQ~@]v@cAtAgB`Bm@r@w@bAm@tAUbCIToAzCIN@ZpARTDXNrBh@`Af@EPPHxA|@dh@vZhJhFzI`FnAd@d@Pf@LjCTrBP`@FZLd@\\nE`GxD~E}AxBeBpCfAtAe@p@aAzA`HzIrBnC",
  user_id: user_hash[rand(21)].id,
  description: workout_quote,
  est_duration: 8220,
  elevation: 364,
  distance: 7.1,
  marker_coordinates:
  [40.7727517,
    -73.8942686,
    40.7880875,
    -73.8844909,
    40.7904987,
    -73.8903386,
    40.7960568,
    -73.8848602,
    40.7867372,
    -73.8739486,
    40.7864687,
    -73.8838318,
    40.7726274,
    -73.8969375,
    40.7710089,
    -73.9002302]
);


  route16 = Route.create(
    route_name: gen_route_name,
    activity_type: "WALKING",
    coordinates_list:
     "epaxFl{wcMxIhI|GnGhE|Da@jBgBjH|@PtEn@hH~@L@RD?DCjAPj@DPELAHdAMt@MVtAZpB_AXWRZtAjEHlJf@`GRxJh@pOx@lCMRGVDRN~DpBx@f@h@d@|@jAr@~@f@x@n@vAp@tAdAjEz@nBdA~AvGhGxCpCd@`@vA~@bFxBhDjAlB`@bAHv@?|CK|Fi@jAKhA?~FVvAFz@XlClATNXRzE`FPVfAbAvA~AhFlFlDfDrIdG^^fD|DNNxDpC^XzC~C~HzHRRrDrDn@`AtC`ElAjBzAoBZi@vBtBXTTR~@`A|UtUv@z@pApAV]lGgK|FtCpFlCqFmCrDiOaC_A}EuDyBsAyFaDs@k@WWwFcEyAaAgF_Dg_@aU}DmCmAcAm@o@_DgDq@k@s@q@_@a@MKw@u@kFwDbCmGn@aBtCqH_QkW{A_CeBsBy@{@eEwEaCkC}BiCiAiAw@cA`BiIhB{Ir@mDu@e@gI_JmBuBaJuJsEaFEkGBS@WE_AMYsMuMiAeAC?G@k@x@aBkBiE{E[Sc@[m@m@WY\\OSe@WWM]M_@o@a@MGODm@H{@?i@UcBgEUyFRq@h@aAr@cAXk@Ng@Ji@Bi@Ek@DaB\\oCNiALiBH}CHo@He@Pq@`@mAFa@?]CWWkAo@{@OiBCoAGcB?a@SiBAe@~DaJyBmAkB_AcBw@MSKa@Ls@lA_GfAgFTmARmCVkD`@uF}AUyCm@dAaMJcDTwCJgAJcAj@eCx@yCZ_AZaAhAeCdB}DtByEnAwCd@eAgGoFiFqESW[aAGa@GMg@o@iDuCyDcDkFuEwHyGv@iBgBwAkEsDiEqDyBsBg@i@gAeAo@e@uCiBNe@r@aClAoDVu@sBwA{AcA_KwGwPcLfCqMdB}IaDwA[`BZaB_D{AoBtHkAvDsBvEmGpM{AdDgBnDaBpDyGpN{HpPqHlOCPSb@w@`Bq@pASpAmAtLEd@Cx@DbAX|BXlBNtADnAAlAGjAMv@Kf@Ur@wAvDSd@mBtC]z@Kx@UtDg@zHWzDM`Ak@nDiApFyBjJSn@o@rB{CbL?RDPRPj@d@Zp@Jf@Ab@B\\TfBDEH@PNj@r@f@Xd@j@FJJ`@jBpEjAtBn@tAAJu@fBE\\A^vFhHa@d@S^]hAgEbRmCjLmClKrKpHj@^vAlArChClAn@tCx@uE`UUjBtAf@~Ar@",
    user_id: user_hash[rand(21)].id,
    description: workout_quote,
    est_duration: 240,
    elevation: 847,
    distance: 16.5,
    marker_coordinates:
     [40.8091506,
      -74.1831107,
      40.7540855,
      -74.2189109,
      40.800548,
      -74.120285,
      40.8101938,
      -74.1797487]
  )

route3 = Route.create(
  route_name: gen_route_name,
  activity_type: "BICYCLING",
  coordinates_list:
   "{tpwFp`ubMjD}I|DiKb@kANERY~BwGvAeEnB_IhCiKd@cCvAj@hGfCTPbA`@B_@FK^sAPHD@@@?DMh@BHh@C\\C\\@\\Cf@UNCLCp@_@^QbF_CpCqAnHkDlEsB~@e@|XkM`MwFxNwGvCsA`@WNWVo@H]Bc@AUGOIGOCKBGFYpAMvAApAAl@?T|BFpBJ~CJzAF|CDnBFvEJ~FHbHLxCJVHdBz@dA`@xBrAfCwI\\cADMvBpAjC~ArF`DzS{t@tF{RTwA|@uGlJsu@x@yGpJgApMyAnKkAnGy@dAKr@eFhAwJfAwHJ@fBiOhCn@bU~F|FtA`BGfKm@`e@aCbLk@fHc@`J_@z@AvMMp@?|CGf@Kj@U~BaAbCeAbAW~^oBnCS|A[nOeBv`@iEvAOjGu@i@wJuAaWy@gQm@yVKyDQ{JUaH]}MCyAGaBo@gWo@eWW}JrMq@vx@aEn`@sB|EzI~B~Dz@zAnAyAtDmEx@aAhAjB\\n@NQhAqAr@{@^a@AM?QZ_@Va@I[eD|DmApAcBjBu@?w@He@LmE\\_C_E}E{Io`@rBwx@`EsMp@V|Jn@dWn@fWF`BBxA\\|MT`HPzJJxDl@xVx@fQfDtn@h@pJTpEiBRwD^oAJ_Fj@wFt@_XpCyj@fGe`@hE}UhCkLpAuAJ[lA]tAQl@SVKHYFKJyBy@aAOaBC}@N_DnAyAf@u@Hu@MK?WBk@La@NoAp@wAx@}BdA_FlBw@X]FsCHw@PaIzCaBt@_AdAk@z@q@lAs@rBe@bA]`@_@Ri@LcBD[Fy@b@y@Vk@?w@SSM_BaAa@Ou@Ie@F}@j@e@n@Ut@UVg@\\sCZ]By@Km@_CIMKK[GgAKwAGs@Fg@Lo@Tu@d@g@d@y@hAgBe@mD_AyL_DuA_@aCzRmChTObBCT}AzFiGnTwMld@qIfZaCwAoGyDcHmEmAs@c@Oo@WyAs@cHOwAEwDGaKSwEK}AEsCGoBO_DI@i@?yALeBTkAFMJELAJFHHDP?\\Gb@Sl@OZWVqAn@i@TmF`CkFbCuM~F_DzAiTxJkB|@oErBaHdDoJlEoB`AM?SHo@Tw@Aq@FIC?CLq@CCUKg@~Ay@Oc@CiGgCmGiCuAk@kB{@qF}B{@pEIb@oCu@Uv@y@hCcAjDcA|Cu@bCqCwByBcBuDqCyFwDcG}EaG{Ei@w@[c@cBoAOKUQwAUoHgAkB[u@EaAAe@@eAHnA{D",
  user_id: user_hash[rand(21)].id,
  description: workout_quote,
  est_duration: 120,
  elevation: 594,
  distance: 24.2,
  marker_coordinates: [40.7228638, -74.0047253, 40.6094442, -73.9223133, 40.7340533, -73.9889654])

route2 = Route.create(
  route_name: gen_route_name,
  activity_type: "WALKING",
  coordinates_list:
   "ulzwFdn_bMqEaG_@c@SM[MeBQkCUo@Gg@MmAc@{As@wL_HkKcGme@}XQIDQaAg@mBe@Y?P?M?EhBA|GDp@TbAbAbDDJ{@j@kD~BkAv@c@ReAd@a@DyADOBMHGNA\\?nDAzAGh@Od@QXWZQJi@L}@@mB?_@C[[EKAwAAMAECCKAo@?OCGECoD?c@?QE?w@@CCACAk@GQKEYAq@CAm@EMQEYAyBACmAE}@E_@ISUSq@[_AYoBDg@ASIYMCCEC?{F@oCHmAp@sANS`@_@ZQ^Q~@W`@I`@KAQFKEqAGq@Ms@K}@A_AbAyLh@uFTkA\\cA~@kBrFqIbA}Az@i@|@OfAQ?[Hu@l@N~Df@`Bv@tCd@x@H^Cn@OdBe@fB]`@QJIL[PuAFkBGjBQtAMZKHa@PgB\\eBd@o@N_@By@IuCe@aBw@_Eg@_@IEZCl@x@MfAM`@@h@NTN\\\\^~@PrAt@dILp@d@v@NLp@Tn@Jd@@\\Gr@Wz@_@h@Od@C\\B\\DZP\\Xb@h@Zf@Rj@Lp@HdABf@bABK~AMbB@^DZ?NuAjJGLYBKJA\\BHd@XIz@H{@e@YCI@]JKXCFMtAkJ?OE[A_@LcBHmAaACQ~@]v@cAtAgB`Bm@r@w@bAm@tAUbCIToAzCIN@ZpARTDXNrBh@`Af@EPPHxA|@dh@vZhJhFzI`FnAd@d@Pf@LjCTrBP`@FZLd@\\nE`GxD~E}AxBeBpCfAtAe@p@aAzA`HzIrBnC",
  user_id: user_hash[rand(21)].id,
  description: workout_quote,
  est_duration: 8220,
  elevation: 364,
  distance: 7.1,
  marker_coordinates:
   [40.7727517,
    -73.8942686,
    40.7880875,
    -73.8844909,
    40.7904987,
    -73.8903386,
    40.7960568,
    -73.8848602,
    40.7867372,
    -73.8739486,
    40.7864687,
    -73.8838318,
    40.7726274,
    -73.8969375,
    40.7710089,
    -73.9002302])

route15 = Route.create(
  route_name: gen_route_name,
  activity_type: "BICYCLING",
  coordinates_list:
   "_mbxFdlkbMkHfGw@h@\\dAl@lBwAlAm@d@}EjEkExDEJaAfAkAdA^`@?Lr@t@jEvEzGvFdGtDzAl@t@l@^RX?n@r@l@f@t@\\\\Rf@^lHrElAj@pF`Dh@LxB~AhC|AfBpAj@Tj@l@`Ar@vA|@bCdBpCdBd@`@xAfAPD`At@tHtE|NdJ`EpCpDzBxErCfCfBpFhDpJdGtC~BnF`DdAd@vJfGzBrA`]zS~GdEv@Zv@XxDbCPDtACL@v@`@r@Hd@VlA~@tNnJxFjDnGdE^TPf@VZ|E~Cx@p@p@ZfAPbDRhBb@`@NVOF@fEjCjHzEhN~INT~B|At@j@f@t@xAjC~@rArAdBdBrAJLxCrB~@d@|BzAf_@nVhB~@xOjEpCr@z@JhBEbASx@Pj@QfAe@RSHa@JUd@?lTxBnDb@rAP`E^VJb@D|AXxDd@n@Nh@ZpA`Ad@Fz@`@ZLT?|AJvAGfDMlHVjBPnCHbB@fAD~CLzCVlDFdJb@`BNxA@zHb@zFd@zKhAzOnB|@RrEp@z@DrARxCj@dInAb@uA`HgSrBaGqBwAsEgD}HaGoA_Ae@i@KI|@gCd@uAqB}AkCjHwA`EjAz@tBrAj@^DNzEjD`EvCjAx@t@h@KZwDpKm@bBiBfFKZYEyCc@yCk@sAS{@EsEq@}@S{OoB{KiA{Fe@{Hc@yAAaBOeJc@mDG{CW_DMgAEcBAoCIkBQmHWgDLwAF}AKU?[M{@a@e@GqAaAi@[o@OyDe@}AYc@EWKmAIsBUsAQoDc@mTyBe@?KTI`@SRgAd@k@Py@QcARiBD{@KqCs@yOkEiB_Ag_@oV}B{A_Ae@yCsBKMeBsAsAeByC_Fg@u@u@k@_C}AOUiN_JkH{EgEkCGAWNa@OiBc@cDSgAQq@[y@q@}E_DW[Qg@_@UmGcEAAyFkDuNoJmA_Ae@Ws@Iw@a@MAuABQEyDcCw@Yw@[_HeEa]{S{BsAwJgGeAe@oFaDuC_CcRoLgCgByEsCqD{BoBoAOyAHs@Ja@A[OYOMq@SN}@Ki@GM[Ya@K}AaAK[WyALDF@FCJsA}AiB\\q@b@SJ?{BwAeG_E`EiM|@aCbBmFNg@OK{FmDfJuYiFiDmGgEhToq@wAiAUo@K}@E_@Pq@`@cAPUl@Sr@f@s@g@WBg@d@QXe@[Sh@KGQCsA{@s@e@oCjIcF|OgCcBeCeBaA~CaEFmCD}KXkLRYGsFuD_CaCeFeFqIuF}CmA_N_Fqc@_PuKiH]MeBi@aBfFoJhZ",
  user_id: user_hash[rand(21)].id,
  description: workout_quote,
  est_duration: 6600,
  elevation: 428,
  distance: 20.4,
  marker_coordinates:
   [40.8137626,
    -73.955388,
    40.7179312,
    -74.0045668,
    40.7988669,
    -73.9489178,
    40.8289778,
    -73.9485938])


route4 = Route.create(
  route_name: gen_route_name,
  activity_type: "BICYCLING",
  coordinates_list:
   "}hwaGxkdqLbIKKlFYjIATe@Co@BQHSPSv@Mv@GPiAC[Dg@Nc@^Y`@S`@o@nC?j@GnBEPA\\ItAGn@lAE~BS\\NVjAFVLFZCHQd@iAT]`@EPE?SRBpAPlCl@fDt@jB`@zAb@n@Zx@p@bEfDhBxA^f@@JFZBT?VCr@Qv@SfA}@|F{BjP_AdIy@vLUtDQtA{@`OK~ACj@PE|Ac@FAp@AlARvHrA~ATn@Ln@Vv@r@Xf@Ln@JxANzBDd@T|@D`@ABEDAF@PFLL?JI@Q?ClFwCrEkCbB}@tAdIl@~Cp@a@fB_An@Or@GhEb@tD`@lCVCfAG`H~A?|ABtFAEfCApAn@h@`@Td@Pd@A~@?lAGzDg@z@LzCv@|Dv@hKbBjPpC`CPjAAjAKv@?j@Hz@ZbI`E_@xIa@vJMtC`CBhAAN@J@XH_@~DeA`K}@bJbB\\E`@WnC@TDDhC|@iC}@EEAGV}CDa@cB]|@cJbCqV~@{J`@uDXgC`@{A`@w@Va@p@q@tCmC^k@^{@bFyN[}@gAwDUe@OKKYk@iCQeB@WWsE?qCFwBTiCCeD]aD{@mE_@uAa@cAe@gAGO?ONk@i@mLMo@Y]Oq@GSa@k@u@mAKQcDyDaFeFmC}De@{@g@}AUkAIeAC{@BeARoBzAsKFiAM_Aq@mA_@cA]i@c@a@sBsCa@]m@s@{BiDoBkEUe@}AkByAmAg@Wu@YmBYa@K_@WUW[y@m@yBMSS?iBlAc@`@KL?|@?XBHNTEHEDMJYJQBUCe@Um@i@aCmBkA{AqAiBm@_Bc@uBUoCC{BDsBVoC^mBp@qB`CaFn@eApC{D~BuB`CyAJEp@i@dAmAl@cAx@eCDSOMcCqBkFaEcGyE_Au@UKI?COIYY]m@a@kBm@gASc@GIAIYgBYIEOMQg@KeA@[Es@Kw@Gi@De@LcAUYi@cA[W?Ec@qDe@qD_BkMSyAUgBe@L]JW@m@CsAi@{@i@u@i@y@w@q@}@sFeIwAkBYYm@YwAi@eFmBYtBe@Ua@UsM}HfGoVv@{CJ]vBtAtFfDjBdAq@`DiAtE[~A}@rGeDfVw@vFOt@w@|CgCdGcCvFcKtTgBxDKPKN[NOTELCXCRGXOJc@Pe@Xg@f@{B~BMNc@p@i@dA[v@_@~@mCpHs@nAuDpEVfAD|BH~EEp@_C`Oc@rCIn@Bj@ElBO|FCt@mB@",
  user_id: user_hash[rand(21)].id,
  description: workout_quote,
  est_duration: 4500,
  elevation: 431,
  distance: 12.6,
  marker_coordinates:
   [42.3951876,
    -71.1342094,
    42.3626859,
    -71.1776074,
    42.3848097,
    -71.1016145,
    42.3940597,
    -71.1331347])

route5 = Route.create(
  route_name: gen_route_name,
  activity_type: "WALKING",
  coordinates_list:
   "gqywFzsobMXY_A{Ak@[g@s@Q_@Um@QOgAk@GGAIGe@KKCE?G@]AUGQSg@Se@]uASa@MK[G]ByACWAq@Oa@Qk@YiCcBg@i@?i@Ce@GQUSOOUE]QOUKCSAPuAHg@o@UISIk@ESEMUa@QKQQKO{@`@k@kAOe@AWC{@]aAo@oARYJOM_@Oc@Qg@_@y@MMiA{@w@[WQ]s@YmACwAAi@I}@IWWUMSm@mBRs@BWc@WDMWQgFiD_C{A]x@\\y@~BzAdFhDc@`AIL[Pk@f@o@pAtAnAVP?t@GZOP[JOLQl@ELMPGPKf@CXNPLZBT?^[|@{@dBMb@EX@`@H`APxABl@G`@QVk@d@ILGVnAd@ZVZZLTV~@HLPJ`@Pb@_@NEF@LRj@x@f@Xj@Fb@Dt@LN\\JDHAn@c@d@[j@s@T]LIJ@v@N\\C\\IDE@WPFBdAJh@R\\FOHKVQJSPKNAt@HIj@H?TDNTLHd@L\\XNZDx@ATf@h@rCjBrAh@j@JfBB\\CPBLDRXTv@Tx@\\x@LZ?n@@NLLHj@BFz@d@XPPXNb@^n@TZb@TfA`BNRJVD^",
  user_id: user_hash[rand(21)].id,
  description: workout_quote,
  est_duration: 3420,
  elevation: 206,
  distance: 2.8,
  marker_coordinates:
   [40.7683557,
    -73.9770963,
    40.7791282,
    -73.9626289,
    40.7784478,
    -73.9697813,
    40.7680555,
    -73.9773504])

  route6 = Route.create(
    route_name: gen_route_name,
    activity_type: "WALKING",
    coordinates_list:
     "mjxwFn`obM`ByEn@mBjAsDHc@nCwI|BmHpDcLTm@zDiMa@YaBeAeC_BcDyBaAq@CHg@rAMTo@vB?L@?JIzAuE|AkE\\}@hBwFtI}WxOme@xOme@|DuL@MACEEFWN[DMNUj@iBnBkGl@gBE?HQJ_@BUDw@GcAE?EK@WD]AGAEJWN]MO}CoD}A_BcAaBk@gASy@]wAUmBKmBGoJIyXKwAgAgHe@aD[aC]gBu@oFOgAQDM}@a@{C_@oCOwAQeC_@WsCwBgMqJ{M{J{NgLqd@g]GEBQFaAD]R_A|@gDFq@H_A?qEJkC`@{E|BcW`B\\?@?@BDNB@A@?ZDr@f@DXPCRH\\?ZMT?XJdB|@t@^`@TLLHXDd@Wx@",
    user_id: user_hash[rand(21)].id,
    description: workout_quote,

    est_duration: 60,
    elevation: 171,
    distance: 5.5,
    marker_coordinates: [40.7621481, -73.9740042, 40.7638628, -73.8990322])

route7 = Route.create(
  route_name: gen_route_name,
  activity_type: "BICYCLING",
  coordinates_list:
   "eqwwFvjqbMcDfKm@jB}ByAyB_B_CwAyFsDyFwD{FsD|CwJpAcEhEwMrHeVxGsSbFaPZiAfK{[yFwDcCaBoH}EaAq@GPg@rAMTo@vB@LBANWzCeJh@qAbA}CtBuGrM}`@bPaf@hOkd@@MGIX{@NUl@kBJa@x@iCb@h@\\RQKFODKr@kB`@u@l@{@x@_A|MeNnBmBlDuDpADbDXrBTzARTuDh@qJj@qJh@sJTqD|IdA}IeATaEh@sJ`AiPuAoE_@aASo@WwA}BqKRaDB[Jc@BKHmBN}Bx@cOrCkf@f@_K\\mFXgEVyDR}DD{@XeC^yDd@kEn@yGtBiRzA}M~@aI`@wDVyB\\yDv@yGnAeLZcCfJaBPZlAlBjFjIf@h@\\ZzAz@bFdCzFkEzJqHhAy@h`@uY~IwGlFeEfIcG`@_@Ro@pAqFt@K`CYvDWt@CvHgAbCGXANGbDKlBq@`CeAhC}@dC}@l@Mr@In@GhDmAzCyAn@[XGzE_AjCg@xC[fIm@AOMgDK{Cq@aRIyBZcHz@{OHyAt@oNPcD~@yPpBs_@rBk_@a@\\yAj@eA?kBd@MHKaAEeAI}AGqBIu@Qm@KQOEaBm@MK[W[UMKCKUcDKs@Qc@OMe@OWGa@BoAl@gAz@wA~@g@Vc@JcCGi@B}ATcBFi@KcAWs@UgA{@o@e@{@cAo@eAe@eBWq@Wk@e@s@UWm@e@W][g@|CoDbCsC_B_ENq@Jk@NYy@aAU_@uAgCiGuKv@g@xAu@bAq@n@q@h@w@OWsEmOe@_Be@}@qBiC_@k@Yc@]sA_@wA_@mBeA}Fw@gEEc@?wAVcEJqBDuC?}@A{@CaTOea@ULi@NsEl@e@F{Bd@}EdA_Dp@Me@gBqQw@uHcHjA}C`@kDRgBBkCPqCLkCNsGZoGZwAyWMyA_@aCyHeg@_CmO}BaOGW@QcB}GoA}Ek@eCcCeKcF}TuE_U{AgIo@eDMOGWUkAaB_Je@eCa@kBY_AAWk@uBOg@CKGQmAqEe@cBKMiA{EoBeM{@_FcBqHqD}OoAkG{A}G_CkJq@}EmAgJ{HpCs@Fe@EkAIDaACq@TAf@S",
  user_id: user_hash[rand(21)].id,
  description: workout_quote,
  est_duration: 7020,
  elevation: 850,
  distance: 18.9,
  marker_coordinates:
   [40.7581055,
    -73.9858797,
    40.7402715,
    -73.926912,
    40.7016674,
    -73.8469022,
    40.7450948,
    -73.7507406])


route8 = Route.create(
  route_name: gen_route_name,
  activity_type: "BICYCLING",
  coordinates_list:
   "wb~vFnaucMtAoLbW|DvCp@tAn@rElC`Al@lA~@NcCh@mD|@qD|GuRv@mA`Ag@lAA`Dl@jCr@pUfDvJrAhA^bIrApDNhDx@`GAlBd@jFxB~DhAnCt@ATNBV?hCZvGr@rJlAzGv@~@c@t@W|AFpBTz@KRDTm@FK@ABCH@b@d@dAWLaCJeDf@uCIoDXaFNQ|@S`ANlIbM~CrDjDdDNz@Ct@@HNYPo@L]j@\\PHz@VnGnA|@PfZ`CrZrBj`@~@dJ]tJm@v`@Zl@RtAdB`G|GzBzB~EbElAbAlCjBtKhGhSzIrXpL~GrD|TtQ~ZdWlEtDhErUzOx{@bInc@@VhCe@~Bc@\\IdB_@Jn@N`ADjBRtDz@bCp@vANt@JtBj@D@LPCbBKhDMhCK`AW~A_A`FkAtEwA~@bAx@xC|@tHd@hJL~CJvCf@\\~D`C~@h@pBr@fDfATTbDrIbE`LvC`Jd@pCBXhAc@h@QnADjElBfA\\lAYhDkAtPwEdK{CtDcAY}BW}AuBsQ_Fu`@aAcDsBaEc]en@cJuPaA}DmBuNoAaD{JgRqLsc@mPmo@WqAYqDVmXTk]QmCw@mDkGcSkMea@aCmHg@w@aLoKqEsEuRwUgBqB}BgBuEwDqNcLuDyEkBmAaBoAuEeGqIiM{HwKlFaKf@wAOgA[yAmBk@uIuB[e@?_A@}@GMMWc@oASsBY}CeAoC]Ug@Lg@h@a@Km@[iA}BmA}A}E{B}Cs@sA}Bq@mAo@a@eAK[He@PSEMQkAvAkE}EmImJw@{BUiCb@}HE}B_@qBo@wAuGoHkM_NaF}EwLeMuJoJaTiTgYsY}@i@q@o@qCkCkGeGkM_QaFiHkKsNyA_ByAiByBqC}@gAyAoAqAkAfDmI{JaI}FgFqCsC_Aw@y@SiD_AqLsDcJmCGw@cBoGjAu@cCkJ}BoI_AiDwEhCe@YoEcFaAu@sEwBa@AiEv@{EaJsBtBuAz@y@j@x@k@fAnCAf@ITURk@BqC]}Go@c@HQPYlAI|AFhE`@`D^jE?~C]jGKz@g@rDiB`HaFdQoIzYi@dCiApHYhFCrEB|AK|AS`AKf@GZWJuEfDuC`DqAjBoExGiFxDqClB_JdIiBtBsDdKkEnM_BlDaDfFaCrCm@l@eAbCgCxIyChKkAzCcHbKwApAiDjC`@vAf@`BN~BbBhWbB~UHbBGrNHlAVv@rGrLpAdCb@nBB~@]jJy@zLc@`G[dG?rED`FIhCo@dM}@|Ow@pOq@`J_AtOQrDEl@w@A",
  user_id: user_hash[rand(21)].id,
  description: workout_quote,
  est_duration: 5340,
  elevation: 908,
  distance: 27.0,
  marker_coordinates:
   [40.6277983,
    -74.1687194,
    40.5182182,
    -74.223691,
    40.6045493,
    -74.0759651,
    40.6268134,
    -74.1604635])

route9 = Route.create(
  route_name: gen_route_name,
  activity_type: "BICYCLING",
  coordinates_list:
   "grvwF`|qcMXAfABpAHPCTBPFLH\\MJKBQGs@?ODOb@m@fC`BVPdC_@H`AbAlM~@~KpGeA`Eq@tAU\\`EdApMFv@NxBFr@p@rHpA~PZpFPtBHv@|BZl@Dn@Z|@PnBf@Bj@b@dFPEBBFhA?DMJCT@XHv@Db@NFjC~@i@dCkAzFaCdLaAnEI^dA`@jAd@bCjAvG|CmAtFkC|Ko@dCuChMw@hD~BbAnBv@|DxAdIvCNVtBx@j@TjCbAb@X`BlAPVjAXbATEXc@~CcCpQqCbSOrA~H~BnJdCk@fEoAhJ_AzGk@fEjG{AXGa@iDwEdAk@fEs@jFoAhJmA`Jg@rDc@GiI{ByUwGeAfD{@fDqBtIuBpK_AzEoAdHKn@WjCAPQFUFY@i@IiAc@mBs@}@U}A]Gb@iCfKoAfFaBpGoAjFGhA_@`GgA|EyFrUqBvIuBnIUKUbAaDdQ[hAyDlLa@rAi@pAkAnDqBbGcBhEy@fBg@l@_@ZoA~@oAtB{CtFsDtG[p@{C|HgDpJ_AhDiAfEiBfHfEvBnGzCzHjDXLtAfAfF`ExCfBlDvBlCnBmCoBmDwByCgB_@~@iAzAk@tAsAdG]xAiAk@cCsAoA}@Hb@@hBA^GXoBtIS`@Of@Et@Ar@CXcAfFaAbF[~AQJQHMHS\\UXQLg@J]Dc@@_@?i@xBUj@e@`@iARy@?g@Ec@K[Oc@_@cAmAgBgB_@W[Kg@MKv@GfAG`AGdE?VB\\BvBy@nR_@|JWhEIj@Qf@U^]`@cAn@y@Pa@F_ABsAGo@S{BuA_B{@{BaAqAQc@@L`BDnBCbH@x@JtAPlBLbD^tJh@~IBdAJdBf@vHp@|JRvBTxAZpA^jAh@pAvEzKzCrGRn@Nx@Fx@@v@Ez@OjASv@e@lAM\\Il@mDlJkBfF}DpKkB~ESLc@hAg@xA_@~Ao@fDK~@SbC]|DKlBG~DOfNWpF_A[gAQcFg@c@EeAUsB{@eB]mC]e@GcAkBaD{Fc@aA}B}E}DjD{DxEoErC_CbBeBnAgB~AyCyFqFuIyAyBaFkHy@eBcFsIWs@WmBEy@@oAF_Ee@@m@Ds@LqA`@yA^",
  user_id: user_hash[rand(21)].id,
  description: workout_quote,
  est_duration: 5760,
  elevation: 1255,
  distance: 14.2,
  marker_coordinates:
   [40.7531569,
    -74.1524943,
    40.7342493,
    -74.2017026,
    40.7542984,
    -74.2562275,
    40.7892068,
    -74.2988617])

route10 = Route.create(
  route_name: gen_route_name,
  activity_type: "BICYCLING",
  coordinates_list:
   "qztwF|kvcMzCfANq@`ByHh@gCd@PlBt@|PfH|@d@bByHdA{FtAcItFsXnE{S~A_ChDaDnB{Bp@}AVmAzBsQhI_p@vCaVEkBm@oGWsAiAuDVM~JiHf@e@pByMGs@iCeG@}CA}B?}DGwNdFc@t@KJIRa@X{AV_B\\wBhAuHcF_BKEIESOa@o@QgAFkCCeAu@eDMgCfCwNaUiH{DmAQdAc@x@k@Xs@S_@iABsAXsBnDyW~D{Xh@eAPCNJJd@{A|Di@hDg@PgSsDa^sG]GB}@T}I|@cXNmDRwKb@kg@@mHe@}ByBmHu@mEgA}FcBoJIuAYaDaA_EaAoLu@yBu@_@w@?eAz@Qh@IvAxAbFDf@b@uAx@wBbAoBlJwRrB}KpB{L@{CWkFSi@]Yj@NrA`@fC~@jAt@b@tAHDVKVc@F_@zAuIfCaNdGdD~TnLnHfFnClB~@j@b@qAbDgK`BeFbBoFrEsObCoFdBmIfFcU~Ga\\bTobA~BaLHaBd@{FVkGjCaf@J}ABYPDxBVd@FjBR^kEFu@jCX@i@@ETAXcEy@Lq@Kk@c@Sk@GiBhCkf@PoDMoBaAuB{B{AuA_AS}@f@}QTwG\\Fl@?n@JlD\\ZyFLKbHdAp@_B`A{C`@uARM`AZfB`@|Dd@lKrCz@^tL~Cd@@@[AaETkDj@aAt@IrAIpAVlAKj@YjAuAC}AE}BP[hBi@`@KJ_@FMFCVUk@uDKk@y@gF]kBsDyHc@_@oPqZu@]BY?W]{B_AaCm@cAe@QgDkHuBmGkAqGkA{K}@wJe@}F{@eKA[YDQgCSuD_@mGMc@uBPuF^uFd@aCXsCEiBa@wG{CsCgAQKFUvAeHr@eDz@gEtFqWfCeNzO{v@AYE_@r@mExBsK`DsOCo@iB_Ad@qB}BoAlBkHfAaE\\mAEy@Cq@IqAa@wFw@{PiEuaAsGsc@uEwYAiBb@oH^cIPmJIaFLgHPyHDmARY^i@b@{@Pa@dDyGHRp@nA|@zAn@r@\\VnCwFdC_F~BwE~IqQzTcd@hQ}]tCqFEcIUyQeAwYY{HzA_EpBqBtAcA`CkCE]eBcA[MA_@S_CuA{O{A}GoEyJsGgM{F}KSw@n@Se@wD_@{J]mJdK_DOuDM}CK}COeEy@sTMmEz@mPh@wJ|@eQtHcvAj@sK_@Yk@}CcB}IaCmO_EaW}DaVa@}BP{@`@}B`AuFb@oD@qBKwB]eLm@}Vu@kF{AiIuF}YaF{WaBwIvDiBdGuCdDiB`GwCbDs@QiDeBuMI[]eBxA{@tH{EjCcBfDwBf@~A",
  user_id: user_hash[rand(21)].id,
  description: workout_quote,
  est_duration: 120,
  elevation: 659,
  distance: 27.2,
  marker_coordinates: [40.7442497, -74.1755147, 40.6995616, -73.7940599])

route11 = Route.create(
  route_name: gen_route_name,
  activity_type: "WALKING",
  coordinates_list:
   "_hrwFnjvcMa@hBd@TUj@aB|BQb@c@dBc@xDO`@iAjIwA~I}BrOc@xCqFeBgA[CAg@gEa@kD_@oDu@sG[aDWwAy@_Ei@oCOgBd@eCj@uCb@eC`DcQH[mDcBoBcAi@WwAk@@[SOA@?@A?C@ICAC?C_CcA_Ao@KSAC@BJR~@n@|BbA@??@?B@@BBB?FC@ARNAZvAj@xCzAlDbBBOhAyFv@mEJoANiA|Cz@FW?GBM`AZ^L@GVmAR}@Vy@BICHWx@zA`@JLPl@dAf@~EzB{@lEI^QdAi@bC{AzGe@vBhD~An@\\",
  user_id: user_hash[rand(21)].id,
  description: workout_quote,
  est_duration: 3360,
  elevation: 206,
  distance: 2.8,
  marker_coordinates:
   [40.7310386,
    -74.1752848,
    40.7352434,
    -74.1847976,
    40.7388451,
    -74.1699194,
    40.7330347,
    -74.1681189,
    40.7313006,
    -74.1745967])

route12 = Route.create(
  route_name: gen_route_name,
  activity_type: "WALKING",
  coordinates_list:
   "mgtwFnksbM}A`FgBiAsBsA}EcDkLuHoNiJ{B{AGNq@c@aAo@mFiD_BgAmD{BwFwD{JwGeCaByAaAa@S}ByA_BeAg@c@kFmDkC_BmFmDyFuDyFwDgOyJ_C}A]MDQGABKCCGIOUO]Oe@M]qA}@YSWw@EACUIo@KWOSgAaBc@UU[_@o@Oc@QYuAw@Ms@MMAI?u@k@uAk@qBSYMEQC]BgBCk@Kg@Qk@WsCkBg@i@@UEy@O[]Ye@MMIOUUEI?Hk@PqAo@UISKu@EQIMU]WOQY{@`@Yo@_@w@ASA}@Mg@s@uAO_@HOTYg@wAa@aAKSw@m@o@_@o@WQUMUMc@S{@CeAAa@CaAOm@_@]Sk@_@mAL_@H]D[FOOIUOwFuD{JsG~BmHDOKIlBgGPg@pCwIdC_I~BmH_ClH~BzA|B|AfEpC`Al@nGhE|FvDzFxDhGzDdGbEdN`JxJrGv@j@nAt@dFdDp@d@j@^b@\\hCbB~CvB|E~CzB|AxJpGxFvDJFENgAnD",
  user_id: user_hash[rand(21)].id,
  description: workout_quote,
  est_duration: 2400,
  elevation: 205,
  distance: 5.9,
  marker_coordinates: [40.7411855, -73.9962383, 40.7768829, -73.9533669, 40.7555646, -73.9721751])

route13 = Route.create(
  route_name: gen_route_name,
  activity_type: "BICYCLING",
  coordinates_list:
   "kc~wFr`nbMb@sAzBzA|FtDtNlJrQtL|LbI~FxDrFaQbBoBj@S`@Dt@p@j@hAj@r@z@n@n@RjADlG]dAPn@\\Zb@\\rAb@xBh@l@tDzB~DrAxBhAz@z@lArBfBpCvC~CtBnAn@Ln@Kv@e@nAuAvAwBb@I~@j@p@b@NDNe@|D{Lh@gB`@mBnFuO~F_RpE_OrG_SbDiKNc@i@]aAq@GPg@rAILg@|AKn@LIvE_NdMa`@xOme@|Qoj@rByGJo@L]|@gCTu@h@cBb@h@\\RQKFODK^gAh@gA`@q@pB}BlPqPo@sEi@kFvD{r@tCsg@j@sJRyDnBTrANpBVr@HXBF}@HoAXoFLeCdAuQpB_^dAmP`AuOjD}\\jJsz@bDcZxAeMdAmC|EuHdBiDx@iC`CiLzBsLhA{EpD{IjCmFt@}CdE}OtFwS|GmW|EqQjDwFjE_E|AoBnCwFrDyKxVst@bD_IfBkDnBsCfLoP^o@xA}CfAsApCcC`E_CrBcBhCyC~B}AxI{Bz@_Az@eEdCsGfD}EhE_EpC_ER}@t@uC@uA[kLA_@S{GqAeIyAaIyG_^}P{}@uB{K_BsGwE_QyBcJBaCj@mCIcCiDuUyF__@wC{Ri@iD`NaI|DaCdFoAXa@@gBpAcMt@kBSoAbBeFl@uAbBgBnEuEfAiCfAuJHeBrTuH|OuFdCy@vC~PwC_QeCx@wDcUkJuj@{CuQmAiHoA^eBd@kARkByCnAuI~AyKy@UH_IVmWqGsBcPqFwNyEEEf@}Dn@oDv@aCr@aC|AqFtDgR`@qBdLvDbKjDSlA~@yFn@_E_WoIs@[oAfGsBxKgC`MeAtDy@vCg@pCgCfOwNmEq@K_^xF]LKl@{HzBcPnEcPpEyDdAMEMIWbBYhBa@pCwHuBoCw@aBk@{HgCaLeDoSyC_BWTf@}BYCPZLXTj@pAb@~CjB`RAxA[rAgCrFWfCKbDLpB|AvFbA|JpAvM`BnOjFvi@nBhRnApIbFxVGP_GdCh@nD@^?^hA]PBHJlAzGx@En@In@SRFCpC\\`E^lAPhAEd@k@p@yAr@GTiC~@}ANuE|A_R~GwC~@yAdAkAQy@Sg@e@MMYjAkCdMSdAIzAD|@d@lARhAEj@{AlBw@z@g@n@_@fACN]WkAzFwB~JgCdMmAlFcCz@sRjHsI~CqJpDkCRyGf@iCRFzDaLx@]D?\\DvD?R?t@Ct@cCrKcGdUmBxD}FvImD|EUj@Y`Bu@hDe@M_g@kDqSyAsa@wC}CdJuApAoG|FgBdAsHfEv@kU",
  user_id: user_hash[rand(21)].id,
  description: workout_quote,
  est_duration: 4320,
  elevation: 820,
  distance: 28.9,
  marker_coordinates:
   [40.7917436,
    -73.9689011,
    40.6989994,
    -73.7614292,
    40.7055913,
    -73.7253996,
    40.7826805,
    -73.8046567])

route14 = Route.create(
  route_name: gen_route_name,
  activity_type: "BICYCLING",
  coordinates_list:
   "eonwFh`ibMm@cNKaAgBsLiD_U}BmNkA_HAg@?y@Dy@Lg@D{AX_G^oJDuF?uBKk@?m@BuBL_GRaH`@g@|@mBnDeHVh@~@hBr@`Az@t@fFkKfG{LzTad@nDgHtAsC_FgFyI_J`CdCvAuClDgHxBkEHY@IoAqGlCeAnFuBhGeCjE_B?mAS{FI{Bk@ePi@qNp@mBh@qA\\e@rC}BTQ^c@R]lAiAAOCMMKa@Uu@a@[MA_@S_Ca@{Es@_IE[s@_Da@aBc@gAwAyCsAwCm@uAq@_AsDqHuDoH_AcBKYMg@n@Se@wD_@{J]mJdK_DOuDM}CY{H[iJg@aNE}Al@_Ll@mLFeAz@_PNqCz@qO`@kHn@sMpCwg@^sHn@gLl@iLjGkCrQ}GpN}Fn]uMrRwHdNqFi@_DaBiI}AuIiE_U_@iCyDeS}AoIs@cD}AcIo@oDtH}CwB_JSw@a@eBsB{InDmE`GmH{@{DaAaEoBiGiCkIkCkIkCcIiAiDOyA{@kDcAcD`MgIc@oCo@cEgAaHEi@c@uBeAsEgBcGIGs@{B]gAw@aC{BmHgA_Eg@aBi@wCYaBGSUsAm@gEMu@uAeJkAsHA[RiCp@yIjBuVzBwYAS[BiABaCBE@IDe@Cc@Ci@GaEaV_Gw]}DmUkDeT_BiJUqATkB`@wDI[|@uEpEyTtE_UpEyThB{IiTcJ~AgIx@mF|AgLlAmJ\\qBh@cC|@wCxB{Ff@kAoEkC{E{DsCwBaDwBoAu@}ByA{@g@aAa@cAa@WG}EoBTq@`BaGy@k@Xy@nAeEX_AfAqDHWmAy@i@[pAkE`C{HjBaGwBwAhBaGwBuAzBmH@@FCBOJm@Tw@d@cBfAiDd@_B_@U}Aw@h@mDpA}Id@cJjJ|@NqDPcIFyIiAKz@yD{B_AqCqAICU@oAIb@cJRuDgCWL}B",
  user_id: user_hash[rand(21)].id,
  description: workout_quote,
  est_duration: 5820,
  elevation: 450,
  distance: 17.3,
  marker_coordinates:
   [40.7117084,
    -73.9432517,
    40.7070109,
    -73.9045876,
    40.684637,
    -73.8223568,
    40.697889,
    -73.6840284])

  route17 = Route.create(
    route_name: gen_route_name,
    activity_type: "WALKING",
    coordinates_list:
     "mgtwFnksbM}A`FgBiAsBsA}EcDkLuHoNiJ{B{AGNq@c@aAo@mFiD_BgAmD{BwFwD{JwGeCaByAaAa@S}ByA_BeAg@c@kFmDkC_BmFmDyFuDyFwDgOyJ_C}A]MDQGABKCCGIOUO]Oe@M]qA}@YSWw@EACUIo@KWOSgAaBc@UU[_@o@Oc@QYuAw@Ms@MMAI?u@k@uAk@qBSYMEQC]BgBCk@Kg@Qk@WsCkBg@i@@UEy@O[]Ye@MMIOUUEI?Hk@PqAo@UISKu@EQIMU]WOQY{@`@Yo@_@w@ASA}@Mg@s@uAO_@HOTYg@wAa@aAKSw@m@o@_@o@WQUMUMc@S{@CeAAa@CaAOm@_@]Sk@_@mAL_@H]D[FOOIUOwFuD{JsG~BmHDOKIlBgGPg@pCwIdC_I~BmH_ClH~BzA|B|AfEpC`Al@nGhE|FvDzFxDhGzDdGbEdN`JxJrGv@j@nAt@dFdDp@d@j@^b@\\hCbB~CvB|E~CzB|AxJpGxFvDJFENgAnD",
    user_id: demo_user.id,
    description: workout_quote,
    est_duration: 2400,
    elevation: 205,
    distance: 5.9,
    marker_coordinates: [40.7411855, -73.9962383, 40.7768829, -73.9533669, 40.7555646, -73.9721751])

  route18 = Route.create(
    route_name: gen_route_name,
    activity_type: "BICYCLING",
    coordinates_list:
     "kc~wFr`nbMb@sAzBzA|FtDtNlJrQtL|LbI~FxDrFaQbBoBj@S`@Dt@p@j@hAj@r@z@n@n@RjADlG]dAPn@\\Zb@\\rAb@xBh@l@tDzB~DrAxBhAz@z@lArBfBpCvC~CtBnAn@Ln@Kv@e@nAuAvAwBb@I~@j@p@b@NDNe@|D{Lh@gB`@mBnFuO~F_RpE_OrG_SbDiKNc@i@]aAq@GPg@rAILg@|AKn@LIvE_NdMa`@xOme@|Qoj@rByGJo@L]|@gCTu@h@cBb@h@\\RQKFODK^gAh@gA`@q@pB}BlPqPo@sEi@kFvD{r@tCsg@j@sJRyDnBTrANpBVr@HXBF}@HoAXoFLeCdAuQpB_^dAmP`AuOjD}\\jJsz@bDcZxAeMdAmC|EuHdBiDx@iC`CiLzBsLhA{EpD{IjCmFt@}CdE}OtFwS|GmW|EqQjDwFjE_E|AoBnCwFrDyKxVst@bD_IfBkDnBsCfLoP^o@xA}CfAsApCcC`E_CrBcBhCyC~B}AxI{Bz@_Az@eEdCsGfD}EhE_EpC_ER}@t@uC@uA[kLA_@S{GqAeIyAaIyG_^}P{}@uB{K_BsGwE_QyBcJBaCj@mCIcCiDuUyF__@wC{Ri@iD`NaI|DaCdFoAXa@@gBpAcMt@kBSoAbBeFl@uAbBgBnEuEfAiCfAuJHeBrTuH|OuFdCy@vC~PwC_QeCx@wDcUkJuj@{CuQmAiHoA^eBd@kARkByCnAuI~AyKy@UH_IVmWqGsBcPqFwNyEEEf@}Dn@oDv@aCr@aC|AqFtDgR`@qBdLvDbKjDSlA~@yFn@_E_WoIs@[oAfGsBxKgC`MeAtDy@vCg@pCgCfOwNmEq@K_^xF]LKl@{HzBcPnEcPpEyDdAMEMIWbBYhBa@pCwHuBoCw@aBk@{HgCaLeDoSyC_BWTf@}BYCPZLXTj@pAb@~CjB`RAxA[rAgCrFWfCKbDLpB|AvFbA|JpAvM`BnOjFvi@nBhRnApIbFxVGP_GdCh@nD@^?^hA]PBHJlAzGx@En@In@SRFCpC\\`E^lAPhAEd@k@p@yAr@GTiC~@}ANuE|A_R~GwC~@yAdAkAQy@Sg@e@MMYjAkCdMSdAIzAD|@d@lARhAEj@{AlBw@z@g@n@_@fACN]WkAzFwB~JgCdMmAlFcCz@sRjHsI~CqJpDkCRyGf@iCRFzDaLx@]D?\\DvD?R?t@Ct@cCrKcGdUmBxD}FvImD|EUj@Y`Bu@hDe@M_g@kDqSyAsa@wC}CdJuApAoG|FgBdAsHfEv@kU",
    user_id: demo_user.id,
    description: workout_quote,
    est_duration: 4320,
    elevation: 820,
    distance: 28.9,
    marker_coordinates:
     [40.7917436,
      -73.9689011,
      40.6989994,
      -73.7614292,
      40.7055913,
      -73.7253996,
      40.7826805,
      -73.8046567])

  route19 = Route.create(
    route_name: gen_route_name,
    activity_type: "BICYCLING",
    coordinates_list:
     "eonwFh`ibMm@cNKaAgBsLiD_U}BmNkA_HAg@?y@Dy@Lg@D{AX_G^oJDuF?uBKk@?m@BuBL_GRaH`@g@|@mBnDeHVh@~@hBr@`Az@t@fFkKfG{LzTad@nDgHtAsC_FgFyI_J`CdCvAuClDgHxBkEHY@IoAqGlCeAnFuBhGeCjE_B?mAS{FI{Bk@ePi@qNp@mBh@qA\\e@rC}BTQ^c@R]lAiAAOCMMKa@Uu@a@[MA_@S_Ca@{Es@_IE[s@_Da@aBc@gAwAyCsAwCm@uAq@_AsDqHuDoH_AcBKYMg@n@Se@wD_@{J]mJdK_DOuDM}CY{H[iJg@aNE}Al@_Ll@mLFeAz@_PNqCz@qO`@kHn@sMpCwg@^sHn@gLl@iLjGkCrQ}GpN}Fn]uMrRwHdNqFi@_DaBiI}AuIiE_U_@iCyDeS}AoIs@cD}AcIo@oDtH}CwB_JSw@a@eBsB{InDmE`GmH{@{DaAaEoBiGiCkIkCkIkCcIiAiDOyA{@kDcAcD`MgIc@oCo@cEgAaHEi@c@uBeAsEgBcGIGs@{B]gAw@aC{BmHgA_Eg@aBi@wCYaBGSUsAm@gEMu@uAeJkAsHA[RiCp@yIjBuVzBwYAS[BiABaCBE@IDe@Cc@Ci@GaEaV_Gw]}DmUkDeT_BiJUqATkB`@wDI[|@uEpEyTtE_UpEyThB{IiTcJ~AgIx@mF|AgLlAmJ\\qBh@cC|@wCxB{Ff@kAoEkC{E{DsCwBaDwBoAu@}ByA{@g@aAa@cAa@WG}EoBTq@`BaGy@k@Xy@nAeEX_AfAqDHWmAy@i@[pAkE`C{HjBaGwBwAhBaGwBuAzBmH@@FCBOJm@Tw@d@cBfAiDd@_B_@U}Aw@h@mDpA}Id@cJjJ|@NqDPcIFyIiAKz@yD{B_AqCqAICU@oAIb@cJRuDgCWL}B",
    user_id: demo_user.id,
    description: workout_quote,
    est_duration: 5820,
    elevation: 450,
    distance: 17.3,
    marker_coordinates:
     [40.7117084,
      -73.9432517,
      40.7070109,
      -73.9045876,
      40.684637,
      -73.8223568,
      40.697889,
      -73.6840284])

      route20 = Route.create(
        route_name: gen_route_name,
        activity_type: "WALKING",
        coordinates_list:
        "ulzwFdn_bMqEaG_@c@SM[MeBQkCUo@Gg@MmAc@{As@wL_HkKcGme@}XQIDQaAg@mBe@Y?P?M?EhBA|GDp@TbAbAbDDJ{@j@kD~BkAv@c@ReAd@a@DyADOBMHGNA\\?nDAzAGh@Od@QXWZQJi@L}@@mB?_@C[[EKAwAAMAECCKAo@?OCGECoD?c@?QE?w@@CCACAk@GQKEYAq@CAm@EMQEYAyBACmAE}@E_@ISUSq@[_AYoBDg@ASIYMCCEC?{F@oCHmAp@sANS`@_@ZQ^Q~@W`@I`@KAQFKEqAGq@Ms@K}@A_AbAyLh@uFTkA\\cA~@kBrFqIbA}Az@i@|@OfAQ?[Hu@l@N~Df@`Bv@tCd@x@H^Cn@OdBe@fB]`@QJIL[PuAFkBGjBQtAMZKHa@PgB\\eBd@o@N_@By@IuCe@aBw@_Eg@_@IEZCl@x@MfAM`@@h@NTN\\\\^~@PrAt@dILp@d@v@NLp@Tn@Jd@@\\Gr@Wz@_@h@Od@C\\B\\DZP\\Xb@h@Zf@Rj@Lp@HdABf@bABK~AMbB@^DZ?NuAjJGLYBKJA\\BHd@XIz@H{@e@YCI@]JKXCFMtAkJ?OE[A_@LcBHmAaACQ~@]v@cAtAgB`Bm@r@w@bAm@tAUbCIToAzCIN@ZpARTDXNrBh@`Af@EPPHxA|@dh@vZhJhFzI`FnAd@d@Pf@LjCTrBP`@FZLd@\\nE`GxD~E}AxBeBpCfAtAe@p@aAzA`HzIrBnC",
        user_id: user_hash[rand(21)].id,
        description: workout_quote,
        est_duration: 8220,
        elevation: 364,
        distance: 7.1,
        marker_coordinates:
        [40.7727517,
          -73.8942686,
          40.7880875,
          -73.8844909,
          40.7904987,
          -73.8903386,
          40.7960568,
          -73.8848602,
          40.7867372,
          -73.8739486,
          40.7864687,
          -73.8838318,
          40.7726274,
          -73.8969375,
          40.7710089,
          -73.9002302]
      );


        route21 = Route.create(
          route_name: gen_route_name,
          activity_type: "WALKING",
          coordinates_list:
           "epaxFl{wcMxIhI|GnGhE|Da@jBgBjH|@PtEn@hH~@L@RD?DCjAPj@DPELAHdAMt@MVtAZpB_AXWRZtAjEHlJf@`GRxJh@pOx@lCMRGVDRN~DpBx@f@h@d@|@jAr@~@f@x@n@vAp@tAdAjEz@nBdA~AvGhGxCpCd@`@vA~@bFxBhDjAlB`@bAHv@?|CK|Fi@jAKhA?~FVvAFz@XlClATNXRzE`FPVfAbAvA~AhFlFlDfDrIdG^^fD|DNNxDpC^XzC~C~HzHRRrDrDn@`AtC`ElAjBzAoBZi@vBtBXTTR~@`A|UtUv@z@pApAV]lGgK|FtCpFlCqFmCrDiOaC_A}EuDyBsAyFaDs@k@WWwFcEyAaAgF_Dg_@aU}DmCmAcAm@o@_DgDq@k@s@q@_@a@MKw@u@kFwDbCmGn@aBtCqH_QkW{A_CeBsBy@{@eEwEaCkC}BiCiAiAw@cA`BiIhB{Ir@mDu@e@gI_JmBuBaJuJsEaFEkGBS@WE_AMYsMuMiAeAC?G@k@x@aBkBiE{E[Sc@[m@m@WY\\OSe@WWM]M_@o@a@MGODm@H{@?i@UcBgEUyFRq@h@aAr@cAXk@Ng@Ji@Bi@Ek@DaB\\oCNiALiBH}CHo@He@Pq@`@mAFa@?]CWWkAo@{@OiBCoAGcB?a@SiBAe@~DaJyBmAkB_AcBw@MSKa@Ls@lA_GfAgFTmARmCVkD`@uF}AUyCm@dAaMJcDTwCJgAJcAj@eCx@yCZ_AZaAhAeCdB}DtByEnAwCd@eAgGoFiFqESW[aAGa@GMg@o@iDuCyDcDkFuEwHyGv@iBgBwAkEsDiEqDyBsBg@i@gAeAo@e@uCiBNe@r@aClAoDVu@sBwA{AcA_KwGwPcLfCqMdB}IaDwA[`BZaB_D{AoBtHkAvDsBvEmGpM{AdDgBnDaBpDyGpN{HpPqHlOCPSb@w@`Bq@pASpAmAtLEd@Cx@DbAX|BXlBNtADnAAlAGjAMv@Kf@Ur@wAvDSd@mBtC]z@Kx@UtDg@zHWzDM`Ak@nDiApFyBjJSn@o@rB{CbL?RDPRPj@d@Zp@Jf@Ab@B\\TfBDEH@PNj@r@f@Xd@j@FJJ`@jBpEjAtBn@tAAJu@fBE\\A^vFhHa@d@S^]hAgEbRmCjLmClKrKpHj@^vAlArChClAn@tCx@uE`UUjBtAf@~Ar@",
          user_id: user_hash[rand(21)].id,
          description: workout_quote,
          est_duration: 240,
          elevation: 847,
          distance: 16.5,
          marker_coordinates:
           [40.8091506,
            -74.1831107,
            40.7540855,
            -74.2189109,
            40.800548,
            -74.120285,
            40.8101938,
            -74.1797487]
        )

      route22 = Route.create(
        route_name: gen_route_name,
        activity_type: "BICYCLING",
        coordinates_list:
         "{tpwFp`ubMjD}I|DiKb@kANERY~BwGvAeEnB_IhCiKd@cCvAj@hGfCTPbA`@B_@FK^sAPHD@@@?DMh@BHh@C\\C\\@\\Cf@UNCLCp@_@^QbF_CpCqAnHkDlEsB~@e@|XkM`MwFxNwGvCsA`@WNWVo@H]Bc@AUGOIGOCKBGFYpAMvAApAAl@?T|BFpBJ~CJzAF|CDnBFvEJ~FHbHLxCJVHdBz@dA`@xBrAfCwI\\cADMvBpAjC~ArF`DzS{t@tF{RTwA|@uGlJsu@x@yGpJgApMyAnKkAnGy@dAKr@eFhAwJfAwHJ@fBiOhCn@bU~F|FtA`BGfKm@`e@aCbLk@fHc@`J_@z@AvMMp@?|CGf@Kj@U~BaAbCeAbAW~^oBnCS|A[nOeBv`@iEvAOjGu@i@wJuAaWy@gQm@yVKyDQ{JUaH]}MCyAGaBo@gWo@eWW}JrMq@vx@aEn`@sB|EzI~B~Dz@zAnAyAtDmEx@aAhAjB\\n@NQhAqAr@{@^a@AM?QZ_@Va@I[eD|DmApAcBjBu@?w@He@LmE\\_C_E}E{Io`@rBwx@`EsMp@V|Jn@dWn@fWF`BBxA\\|MT`HPzJJxDl@xVx@fQfDtn@h@pJTpEiBRwD^oAJ_Fj@wFt@_XpCyj@fGe`@hE}UhCkLpAuAJ[lA]tAQl@SVKHYFKJyBy@aAOaBC}@N_DnAyAf@u@Hu@MK?WBk@La@NoAp@wAx@}BdA_FlBw@X]FsCHw@PaIzCaBt@_AdAk@z@q@lAs@rBe@bA]`@_@Ri@LcBD[Fy@b@y@Vk@?w@SSM_BaAa@Ou@Ie@F}@j@e@n@Ut@UVg@\\sCZ]By@Km@_CIMKK[GgAKwAGs@Fg@Lo@Tu@d@g@d@y@hAgBe@mD_AyL_DuA_@aCzRmChTObBCT}AzFiGnTwMld@qIfZaCwAoGyDcHmEmAs@c@Oo@WyAs@cHOwAEwDGaKSwEK}AEsCGoBO_DI@i@?yALeBTkAFMJELAJFHHDP?\\Gb@Sl@OZWVqAn@i@TmF`CkFbCuM~F_DzAiTxJkB|@oErBaHdDoJlEoB`AM?SHo@Tw@Aq@FIC?CLq@CCUKg@~Ay@Oc@CiGgCmGiCuAk@kB{@qF}B{@pEIb@oCu@Uv@y@hCcAjDcA|Cu@bCqCwByBcBuDqCyFwDcG}EaG{Ei@w@[c@cBoAOKUQwAUoHgAkB[u@EaAAe@@eAHnA{D",
        user_id: user_hash[rand(21)].id,
        description: workout_quote,
        est_duration: 120,
        elevation: 594,
        distance: 24.2,
        marker_coordinates: [40.7228638, -74.0047253, 40.6094442, -73.9223133, 40.7340533, -73.9889654])

      route23 = Route.create(
        route_name: gen_route_name,
        activity_type: "WALKING",
        coordinates_list:
         "ulzwFdn_bMqEaG_@c@SM[MeBQkCUo@Gg@MmAc@{As@wL_HkKcGme@}XQIDQaAg@mBe@Y?P?M?EhBA|GDp@TbAbAbDDJ{@j@kD~BkAv@c@ReAd@a@DyADOBMHGNA\\?nDAzAGh@Od@QXWZQJi@L}@@mB?_@C[[EKAwAAMAECCKAo@?OCGECoD?c@?QE?w@@CCACAk@GQKEYAq@CAm@EMQEYAyBACmAE}@E_@ISUSq@[_AYoBDg@ASIYMCCEC?{F@oCHmAp@sANS`@_@ZQ^Q~@W`@I`@KAQFKEqAGq@Ms@K}@A_AbAyLh@uFTkA\\cA~@kBrFqIbA}Az@i@|@OfAQ?[Hu@l@N~Df@`Bv@tCd@x@H^Cn@OdBe@fB]`@QJIL[PuAFkBGjBQtAMZKHa@PgB\\eBd@o@N_@By@IuCe@aBw@_Eg@_@IEZCl@x@MfAM`@@h@NTN\\\\^~@PrAt@dILp@d@v@NLp@Tn@Jd@@\\Gr@Wz@_@h@Od@C\\B\\DZP\\Xb@h@Zf@Rj@Lp@HdABf@bABK~AMbB@^DZ?NuAjJGLYBKJA\\BHd@XIz@H{@e@YCI@]JKXCFMtAkJ?OE[A_@LcBHmAaACQ~@]v@cAtAgB`Bm@r@w@bAm@tAUbCIToAzCIN@ZpARTDXNrBh@`Af@EPPHxA|@dh@vZhJhFzI`FnAd@d@Pf@LjCTrBP`@FZLd@\\nE`GxD~E}AxBeBpCfAtAe@p@aAzA`HzIrBnC",
        user_id: user_hash[rand(21)].id,
        description: workout_quote,
        est_duration: 8220,
        elevation: 364,
        distance: 7.1,
        marker_coordinates:
         [40.7727517,
          -73.8942686,
          40.7880875,
          -73.8844909,
          40.7904987,
          -73.8903386,
          40.7960568,
          -73.8848602,
          40.7867372,
          -73.8739486,
          40.7864687,
          -73.8838318,
          40.7726274,
          -73.8969375,
          40.7710089,
          -73.9002302])

      route24 = Route.create(
        route_name: gen_route_name,
        activity_type: "BICYCLING",
        coordinates_list:
         "_mbxFdlkbMkHfGw@h@\\dAl@lBwAlAm@d@}EjEkExDEJaAfAkAdA^`@?Lr@t@jEvEzGvFdGtDzAl@t@l@^RX?n@r@l@f@t@\\\\Rf@^lHrElAj@pF`Dh@LxB~AhC|AfBpAj@Tj@l@`Ar@vA|@bCdBpCdBd@`@xAfAPD`At@tHtE|NdJ`EpCpDzBxErCfCfBpFhDpJdGtC~BnF`DdAd@vJfGzBrA`]zS~GdEv@Zv@XxDbCPDtACL@v@`@r@Hd@VlA~@tNnJxFjDnGdE^TPf@VZ|E~Cx@p@p@ZfAPbDRhBb@`@NVOF@fEjCjHzEhN~INT~B|At@j@f@t@xAjC~@rArAdBdBrAJLxCrB~@d@|BzAf_@nVhB~@xOjEpCr@z@JhBEbASx@Pj@QfAe@RSHa@JUd@?lTxBnDb@rAP`E^VJb@D|AXxDd@n@Nh@ZpA`Ad@Fz@`@ZLT?|AJvAGfDMlHVjBPnCHbB@fAD~CLzCVlDFdJb@`BNxA@zHb@zFd@zKhAzOnB|@RrEp@z@DrARxCj@dInAb@uA`HgSrBaGqBwAsEgD}HaGoA_Ae@i@KI|@gCd@uAqB}AkCjHwA`EjAz@tBrAj@^DNzEjD`EvCjAx@t@h@KZwDpKm@bBiBfFKZYEyCc@yCk@sAS{@EsEq@}@S{OoB{KiA{Fe@{Hc@yAAaBOeJc@mDG{CW_DMgAEcBAoCIkBQmHWgDLwAF}AKU?[M{@a@e@GqAaAi@[o@OyDe@}AYc@EWKmAIsBUsAQoDc@mTyBe@?KTI`@SRgAd@k@Py@QcARiBD{@KqCs@yOkEiB_Ag_@oV}B{A_Ae@yCsBKMeBsAsAeByC_Fg@u@u@k@_C}AOUiN_JkH{EgEkCGAWNa@OiBc@cDSgAQq@[y@q@}E_DW[Qg@_@UmGcEAAyFkDuNoJmA_Ae@Ws@Iw@a@MAuABQEyDcCw@Yw@[_HeEa]{S{BsAwJgGeAe@oFaDuC_CcRoLgCgByEsCqD{BoBoAOyAHs@Ja@A[OYOMq@SN}@Ki@GM[Ya@K}AaAK[WyALDF@FCJsA}AiB\\q@b@SJ?{BwAeG_E`EiM|@aCbBmFNg@OK{FmDfJuYiFiDmGgEhToq@wAiAUo@K}@E_@Pq@`@cAPUl@Sr@f@s@g@WBg@d@QXe@[Sh@KGQCsA{@s@e@oCjIcF|OgCcBeCeBaA~CaEFmCD}KXkLRYGsFuD_CaCeFeFqIuF}CmA_N_Fqc@_PuKiH]MeBi@aBfFoJhZ",
        user_id: user_hash[rand(21)].id,
        description: workout_quote,
        est_duration: 6600,
        elevation: 428,
        distance: 20.4,
        marker_coordinates:
         [40.8137626,
          -73.955388,
          40.7179312,
          -74.0045668,
          40.7988669,
          -73.9489178,
          40.8289778,
          -73.9485938])


      route25 = Route.create(
        route_name: gen_route_name,
        activity_type: "BICYCLING",
        coordinates_list:
         "}hwaGxkdqLbIKKlFYjIATe@Co@BQHSPSv@Mv@GPiAC[Dg@Nc@^Y`@S`@o@nC?j@GnBEPA\\ItAGn@lAE~BS\\NVjAFVLFZCHQd@iAT]`@EPE?SRBpAPlCl@fDt@jB`@zAb@n@Zx@p@bEfDhBxA^f@@JFZBT?VCr@Qv@SfA}@|F{BjP_AdIy@vLUtDQtA{@`OK~ACj@PE|Ac@FAp@AlARvHrA~ATn@Ln@Vv@r@Xf@Ln@JxANzBDd@T|@D`@ABEDAF@PFLL?JI@Q?ClFwCrEkCbB}@tAdIl@~Cp@a@fB_An@Or@GhEb@tD`@lCVCfAG`H~A?|ABtFAEfCApAn@h@`@Td@Pd@A~@?lAGzDg@z@LzCv@|Dv@hKbBjPpC`CPjAAjAKv@?j@Hz@ZbI`E_@xIa@vJMtC`CBhAAN@J@XH_@~DeA`K}@bJbB\\E`@WnC@TDDhC|@iC}@EEAGV}CDa@cB]|@cJbCqV~@{J`@uDXgC`@{A`@w@Va@p@q@tCmC^k@^{@bFyN[}@gAwDUe@OKKYk@iCQeB@WWsE?qCFwBTiCCeD]aD{@mE_@uAa@cAe@gAGO?ONk@i@mLMo@Y]Oq@GSa@k@u@mAKQcDyDaFeFmC}De@{@g@}AUkAIeAC{@BeARoBzAsKFiAM_Aq@mA_@cA]i@c@a@sBsCa@]m@s@{BiDoBkEUe@}AkByAmAg@Wu@YmBYa@K_@WUW[y@m@yBMSS?iBlAc@`@KL?|@?XBHNTEHEDMJYJQBUCe@Um@i@aCmBkA{AqAiBm@_Bc@uBUoCC{BDsBVoC^mBp@qB`CaFn@eApC{D~BuB`CyAJEp@i@dAmAl@cAx@eCDSOMcCqBkFaEcGyE_Au@UKI?COIYY]m@a@kBm@gASc@GIAIYgBYIEOMQg@KeA@[Es@Kw@Gi@De@LcAUYi@cA[W?Ec@qDe@qD_BkMSyAUgBe@L]JW@m@CsAi@{@i@u@i@y@w@q@}@sFeIwAkBYYm@YwAi@eFmBYtBe@Ua@UsM}HfGoVv@{CJ]vBtAtFfDjBdAq@`DiAtE[~A}@rGeDfVw@vFOt@w@|CgCdGcCvFcKtTgBxDKPKN[NOTELCXCRGXOJc@Pe@Xg@f@{B~BMNc@p@i@dA[v@_@~@mCpHs@nAuDpEVfAD|BH~EEp@_C`Oc@rCIn@Bj@ElBO|FCt@mB@",
        user_id: user_hash[rand(21)].id,
        description: workout_quote,
        est_duration: 4500,
        elevation: 431,
        distance: 12.6,
        marker_coordinates:
         [42.3951876,
          -71.1342094,
          42.3626859,
          -71.1776074,
          42.3848097,
          -71.1016145,
          42.3940597,
          -71.1331347])

      route26 = Route.create(
        route_name: gen_route_name,
        activity_type: "WALKING",
        coordinates_list:
         "gqywFzsobMXY_A{Ak@[g@s@Q_@Um@QOgAk@GGAIGe@KKCE?G@]AUGQSg@Se@]uASa@MK[G]ByACWAq@Oa@Qk@YiCcBg@i@?i@Ce@GQUSOOUE]QOUKCSAPuAHg@o@UISIk@ESEMUa@QKQQKO{@`@k@kAOe@AWC{@]aAo@oARYJOM_@Oc@Qg@_@y@MMiA{@w@[WQ]s@YmACwAAi@I}@IWWUMSm@mBRs@BWc@WDMWQgFiD_C{A]x@\\y@~BzAdFhDc@`AIL[Pk@f@o@pAtAnAVP?t@GZOP[JOLQl@ELMPGPKf@CXNPLZBT?^[|@{@dBMb@EX@`@H`APxABl@G`@QVk@d@ILGVnAd@ZVZZLTV~@HLPJ`@Pb@_@NEF@LRj@x@f@Xj@Fb@Dt@LN\\JDHAn@c@d@[j@s@T]LIJ@v@N\\C\\IDE@WPFBdAJh@R\\FOHKVQJSPKNAt@HIj@H?TDNTLHd@L\\XNZDx@ATf@h@rCjBrAh@j@JfBB\\CPBLDRXTv@Tx@\\x@LZ?n@@NLLHj@BFz@d@XPPXNb@^n@TZb@TfA`BNRJVD^",
        user_id: user_hash[rand(21)].id,
        description: workout_quote,
        est_duration: 3420,
        elevation: 206,
        distance: 2.8,
        marker_coordinates:
         [40.7683557,
          -73.9770963,
          40.7791282,
          -73.9626289,
          40.7784478,
          -73.9697813,
          40.7680555,
          -73.9773504])

        route27 = Route.create(
          route_name: gen_route_name,
          activity_type: "WALKING",
          coordinates_list:
           "mjxwFn`obM`ByEn@mBjAsDHc@nCwI|BmHpDcLTm@zDiMa@YaBeAeC_BcDyBaAq@CHg@rAMTo@vB?L@?JIzAuE|AkE\\}@hBwFtI}WxOme@xOme@|DuL@MACEEFWN[DMNUj@iBnBkGl@gBE?HQJ_@BUDw@GcAE?EK@WD]AGAEJWN]MO}CoD}A_BcAaBk@gASy@]wAUmBKmBGoJIyXKwAgAgHe@aD[aC]gBu@oFOgAQDM}@a@{C_@oCOwAQeC_@WsCwBgMqJ{M{J{NgLqd@g]GEBQFaAD]R_A|@gDFq@H_A?qEJkC`@{E|BcW`B\\?@?@BDNB@A@?ZDr@f@DXPCRH\\?ZMT?XJdB|@t@^`@TLLHXDd@Wx@",
          user_id: user_hash[rand(21)].id,
          description: workout_quote,

          est_duration: 60,
          elevation: 171,
          distance: 5.5,
          marker_coordinates: [40.7621481, -73.9740042, 40.7638628, -73.8990322])

      route28 = Route.create(
        route_name: gen_route_name,
        activity_type: "BICYCLING",
        coordinates_list:
         "eqwwFvjqbMcDfKm@jB}ByAyB_B_CwAyFsDyFwD{FsD|CwJpAcEhEwMrHeVxGsSbFaPZiAfK{[yFwDcCaBoH}EaAq@GPg@rAMTo@vB@LBANWzCeJh@qAbA}CtBuGrM}`@bPaf@hOkd@@MGIX{@NUl@kBJa@x@iCb@h@\\RQKFODKr@kB`@u@l@{@x@_A|MeNnBmBlDuDpADbDXrBTzARTuDh@qJj@qJh@sJTqD|IdA}IeATaEh@sJ`AiPuAoE_@aASo@WwA}BqKRaDB[Jc@BKHmBN}Bx@cOrCkf@f@_K\\mFXgEVyDR}DD{@XeC^yDd@kEn@yGtBiRzA}M~@aI`@wDVyB\\yDv@yGnAeLZcCfJaBPZlAlBjFjIf@h@\\ZzAz@bFdCzFkEzJqHhAy@h`@uY~IwGlFeEfIcG`@_@Ro@pAqFt@K`CYvDWt@CvHgAbCGXANGbDKlBq@`CeAhC}@dC}@l@Mr@In@GhDmAzCyAn@[XGzE_AjCg@xC[fIm@AOMgDK{Cq@aRIyBZcHz@{OHyAt@oNPcD~@yPpBs_@rBk_@a@\\yAj@eA?kBd@MHKaAEeAI}AGqBIu@Qm@KQOEaBm@MK[W[UMKCKUcDKs@Qc@OMe@OWGa@BoAl@gAz@wA~@g@Vc@JcCGi@B}ATcBFi@KcAWs@UgA{@o@e@{@cAo@eAe@eBWq@Wk@e@s@UWm@e@W][g@|CoDbCsC_B_ENq@Jk@NYy@aAU_@uAgCiGuKv@g@xAu@bAq@n@q@h@w@OWsEmOe@_Be@}@qBiC_@k@Yc@]sA_@wA_@mBeA}Fw@gEEc@?wAVcEJqBDuC?}@A{@CaTOea@ULi@NsEl@e@F{Bd@}EdA_Dp@Me@gBqQw@uHcHjA}C`@kDRgBBkCPqCLkCNsGZoGZwAyWMyA_@aCyHeg@_CmO}BaOGW@QcB}GoA}Ek@eCcCeKcF}TuE_U{AgIo@eDMOGWUkAaB_Je@eCa@kBY_AAWk@uBOg@CKGQmAqEe@cBKMiA{EoBeM{@_FcBqHqD}OoAkG{A}G_CkJq@}EmAgJ{HpCs@Fe@EkAIDaACq@TAf@S",
        user_id: user_hash[rand(21)].id,
        description: workout_quote,
        est_duration: 7020,
        elevation: 850,
        distance: 18.9,
        marker_coordinates:
         [40.7581055,
          -73.9858797,
          40.7402715,
          -73.926912,
          40.7016674,
          -73.8469022,
          40.7450948,
          -73.7507406])


      route29 = Route.create(
        route_name: gen_route_name,
        activity_type: "BICYCLING",
        coordinates_list:
         "wb~vFnaucMtAoLbW|DvCp@tAn@rElC`Al@lA~@NcCh@mD|@qD|GuRv@mA`Ag@lAA`Dl@jCr@pUfDvJrAhA^bIrApDNhDx@`GAlBd@jFxB~DhAnCt@ATNBV?hCZvGr@rJlAzGv@~@c@t@W|AFpBTz@KRDTm@FK@ABCH@b@d@dAWLaCJeDf@uCIoDXaFNQ|@S`ANlIbM~CrDjDdDNz@Ct@@HNYPo@L]j@\\PHz@VnGnA|@PfZ`CrZrBj`@~@dJ]tJm@v`@Zl@RtAdB`G|GzBzB~EbElAbAlCjBtKhGhSzIrXpL~GrD|TtQ~ZdWlEtDhErUzOx{@bInc@@VhCe@~Bc@\\IdB_@Jn@N`ADjBRtDz@bCp@vANt@JtBj@D@LPCbBKhDMhCK`AW~A_A`FkAtEwA~@bAx@xC|@tHd@hJL~CJvCf@\\~D`C~@h@pBr@fDfATTbDrIbE`LvC`Jd@pCBXhAc@h@QnADjElBfA\\lAYhDkAtPwEdK{CtDcAY}BW}AuBsQ_Fu`@aAcDsBaEc]en@cJuPaA}DmBuNoAaD{JgRqLsc@mPmo@WqAYqDVmXTk]QmCw@mDkGcSkMea@aCmHg@w@aLoKqEsEuRwUgBqB}BgBuEwDqNcLuDyEkBmAaBoAuEeGqIiM{HwKlFaKf@wAOgA[yAmBk@uIuB[e@?_A@}@GMMWc@oASsBY}CeAoC]Ug@Lg@h@a@Km@[iA}BmA}A}E{B}Cs@sA}Bq@mAo@a@eAK[He@PSEMQkAvAkE}EmImJw@{BUiCb@}HE}B_@qBo@wAuGoHkM_NaF}EwLeMuJoJaTiTgYsY}@i@q@o@qCkCkGeGkM_QaFiHkKsNyA_ByAiByBqC}@gAyAoAqAkAfDmI{JaI}FgFqCsC_Aw@y@SiD_AqLsDcJmCGw@cBoGjAu@cCkJ}BoI_AiDwEhCe@YoEcFaAu@sEwBa@AiEv@{EaJsBtBuAz@y@j@x@k@fAnCAf@ITURk@BqC]}Go@c@HQPYlAI|AFhE`@`D^jE?~C]jGKz@g@rDiB`HaFdQoIzYi@dCiApHYhFCrEB|AK|AS`AKf@GZWJuEfDuC`DqAjBoExGiFxDqClB_JdIiBtBsDdKkEnM_BlDaDfFaCrCm@l@eAbCgCxIyChKkAzCcHbKwApAiDjC`@vAf@`BN~BbBhWbB~UHbBGrNHlAVv@rGrLpAdCb@nBB~@]jJy@zLc@`G[dG?rED`FIhCo@dM}@|Ow@pOq@`J_AtOQrDEl@w@A",
        user_id: user_hash[rand(21)].id,
        description: workout_quote,
        est_duration: 5340,
        elevation: 908,
        distance: 27.0,
        marker_coordinates:
         [40.6277983,
          -74.1687194,
          40.5182182,
          -74.223691,
          40.6045493,
          -74.0759651,
          40.6268134,
          -74.1604635])

      route30 = Route.create(
        route_name: gen_route_name,
        activity_type: "BICYCLING",
        coordinates_list:
         "grvwF`|qcMXAfABpAHPCTBPFLH\\MJKBQGs@?ODOb@m@fC`BVPdC_@H`AbAlM~@~KpGeA`Eq@tAU\\`EdApMFv@NxBFr@p@rHpA~PZpFPtBHv@|BZl@Dn@Z|@PnBf@Bj@b@dFPEBBFhA?DMJCT@XHv@Db@NFjC~@i@dCkAzFaCdLaAnEI^dA`@jAd@bCjAvG|CmAtFkC|Ko@dCuChMw@hD~BbAnBv@|DxAdIvCNVtBx@j@TjCbAb@X`BlAPVjAXbATEXc@~CcCpQqCbSOrA~H~BnJdCk@fEoAhJ_AzGk@fEjG{AXGa@iDwEdAk@fEs@jFoAhJmA`Jg@rDc@GiI{ByUwGeAfD{@fDqBtIuBpK_AzEoAdHKn@WjCAPQFUFY@i@IiAc@mBs@}@U}A]Gb@iCfKoAfFaBpGoAjFGhA_@`GgA|EyFrUqBvIuBnIUKUbAaDdQ[hAyDlLa@rAi@pAkAnDqBbGcBhEy@fBg@l@_@ZoA~@oAtB{CtFsDtG[p@{C|HgDpJ_AhDiAfEiBfHfEvBnGzCzHjDXLtAfAfF`ExCfBlDvBlCnBmCoBmDwByCgB_@~@iAzAk@tAsAdG]xAiAk@cCsAoA}@Hb@@hBA^GXoBtIS`@Of@Et@Ar@CXcAfFaAbF[~AQJQHMHS\\UXQLg@J]Dc@@_@?i@xBUj@e@`@iARy@?g@Ec@K[Oc@_@cAmAgBgB_@W[Kg@MKv@GfAG`AGdE?VB\\BvBy@nR_@|JWhEIj@Qf@U^]`@cAn@y@Pa@F_ABsAGo@S{BuA_B{@{BaAqAQc@@L`BDnBCbH@x@JtAPlBLbD^tJh@~IBdAJdBf@vHp@|JRvBTxAZpA^jAh@pAvEzKzCrGRn@Nx@Fx@@v@Ez@OjASv@e@lAM\\Il@mDlJkBfF}DpKkB~ESLc@hAg@xA_@~Ao@fDK~@SbC]|DKlBG~DOfNWpF_A[gAQcFg@c@EeAUsB{@eB]mC]e@GcAkBaD{Fc@aA}B}E}DjD{DxEoErC_CbBeBnAgB~AyCyFqFuIyAyBaFkHy@eBcFsIWs@WmBEy@@oAF_Ee@@m@Ds@LqA`@yA^",
        user_id: user_hash[rand(21)].id,
        description: workout_quote,
        est_duration: 5760,
        elevation: 1255,
        distance: 14.2,
        marker_coordinates:
         [40.7531569,
          -74.1524943,
          40.7342493,
          -74.2017026,
          40.7542984,
          -74.2562275,
          40.7892068,
          -74.2988617])

routes = [route1, route2, route3, route4, route5, route6, route7, route8, route9, route10, route11, route12, route13, route14, route15, route16, route20, route21, route22, route23, route24, route25, route26, route27, route28, route29, route30]

demo_user_routes = [route17, route18, route19]

activity_hash = {}

(1..300).to_a.each do |num|
  temp_route = routes.sample
  activity_hash[num] = Activity.create(
    distance: temp_route.distance,
    duration: temp_route.est_duration * ((8 + rand(5)).to_f*0.1),
    elevation: temp_route.elevation,
    activity_type: temp_route.activity_type,
    user_id: temp_route.user_id,
    route_id: temp_route.id,
    date: dates.sample,
    title: gen_activity_name
  )
end

(0..20).to_a.each do |num|
  3.times do
    Activity.create(
      distance: (0..20).to_a.sample,
      duration: (1000..6000).to_a.sample,
      elevation: (0..1000).to_a.sample,
      activity_type: ["WALKING", "BICYCLING"].sample,
      user_id: user_hash[num].id,
      date: dates.sample,
      title: gen_activity_name
    )
  end
end

user_activity_hash = {}

(1..30).to_a.each do |num|
  temp_route = demo_user_routes.sample
  user_activity_hash[num] = Activity.create(
    distance: temp_route.distance,
    duration: temp_route.est_duration * ((8 + rand(5)).to_f*0.1),
    elevation: temp_route.elevation,
    activity_type: temp_route.activity_type,
    user_id: demo_user.id,
    route_id: temp_route.id,
    date: dates.sample,
    title: gen_activity_name
  )
end

demo_user.activities.each do |activity|
  friends = demo_user.friends
  rand(6).times do
    Comment.create(user_id: friends.sample.id, activity_id: activity.id, body: gen_comment)
  end
end

(0..20).to_a.each do |num|
  user = user_hash[num]
  friends = user.friends
  user.activities.each do |activity|
    rand(4).times do
      Comment.create(user_id: friends.sample.id, activity_id: activity.id, body: gen_comment)
    end
  end
end
