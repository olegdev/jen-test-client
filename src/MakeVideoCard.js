import { useState, useEffect } from 'react'
import VideoFetcher from './VideoFetcher'

const { REACT_APP_API_URL } = process.env

const testCData = `{"drawing":[{"size":118.57142857142857,"style":"x","paintStyle":"draw","stroke":[{"x":0.8407175590306545,"y":0.2072977078155206},{"x":0.8376106824772163,"y":0.2091388198471877},{"x":0.8334681804059652,"y":0.21282104391052195},{"x":0.8303613038525269,"y":0.21834438000552334},{"x":0.8262188017812758,"y":0.22386771610052472},{"x":0.821040674192212,"y":0.2293910521955261},{"x":0.8148269210853355,"y":0.2349143882905275},{"x":0.8096487934962717,"y":0.23859661235386173},{"x":0.8034350403893952,"y":0.24411994844886312},{"x":0.7951500362468931,"y":0.2514843965755316},{"x":0.7868650321043911,"y":0.25884884470220015},{"x":0.7775444024440762,"y":0.26621329282886863},{"x":0.7671881472659486,"y":0.2754188529872043},{"x":0.7578675176056338,"y":0.2827833011138728},{"x":0.748546887945319,"y":0.2901477492405413},{"x":0.7381906327671913,"y":0.29935330939887694},{"x":0.7257631265534382,"y":0.3103999815888797},{"x":0.7205849989643744,"y":0.31408220565221395},{"x":0.7133356203396851,"y":0.3214466537788825},{"x":0.7050506161971831,"y":0.32881110190555096},{"x":0.6988368630903066,"y":0.33433443800055235},{"x":0.69262310998343,"y":0.33985777409555373},{"x":0.6843381058409279,"y":0.3472222222222222},{"x":0.6760531016984258,"y":0.35458667034889074},{"x":0.666732472038111,"y":0.36011000644389213},{"x":0.6563762168599834,"y":0.36931556660222775},{"x":0.6460199616818558,"y":0.3766800147288963},{"x":0.6366993320215409,"y":0.38220335082389767},{"x":0.6273787023612262,"y":0.38956779895056615},{"x":0.6201293237365368,"y":0.39509113504556753},{"x":0.6128799451118475,"y":0.40245558317223606},{"x":0.6045949409693455,"y":0.4061378072355703},{"x":0.598381187862469,"y":0.4116611433305717},{"x":0.5911318092377796,"y":0.4171844794255731},{"x":0.5818111795774648,"y":0.42454892755224155},{"x":0.5735261754349628,"y":0.4319133756789101},{"x":0.5631699202568351,"y":0.43743671177391147},{"x":0.5538492905965203,"y":0.4466422719322471},{"x":0.5424574099005799,"y":0.4540067200589156},{"x":0.5331367802402651,"y":0.4613711681855841},{"x":0.5238161505799502,"y":0.46873561631225263},{"x":0.5144955209196355,"y":0.4761000644389211},{"x":0.5062105167771334,"y":0.48346451256558964},{"x":0.5010323891880696,"y":0.4871467366289239},{"x":0.49274738504556753,"y":0.49267007272392527},{"x":0.4854980064208782,"y":0.49819340881892665},{"x":0.47928425331400165,"y":0.5018756328822609},{"x":0.4741061257249379,"y":0.5073989689772623},{"x":0.46892799813587405,"y":0.5092400810089294},{"x":0.4627142450289975,"y":0.5147634171039308},{"x":0.45650049192212094,"y":0.5184456411672651},{"x":0.4502867388152444,"y":0.5221278652305993},{"x":0.44407298570836784,"y":0.5276512013256007},{"x":0.4378592326014913,"y":0.5313334253889349},{"x":0.43164547949461474,"y":0.5350156494522692},{"x":0.4254317263877382,"y":0.5405389855472705},{"x":0.42128922431648713,"y":0.5442212096106048},{"x":0.41611109672742336,"y":0.5479034336739391},{"x":0.40679046706710853,"y":0.5552678818006076},{"x":0.4026479649958575,"y":0.5571089938322747},{"x":0.3985054629246065,"y":0.5626323299272761},{"x":0.39332733533554265,"y":0.5663145539906104},{"x":0.3891848332642916,"y":0.5699967780539446},{"x":0.3840067056752278,"y":0.575520114148946},{"x":0.37986420360397677,"y":0.5792023382122803},{"x":0.37572170153272577,"y":0.5847256743072816},{"x":0.3695079484258492,"y":0.5902490104022831},{"x":0.3622585698011599,"y":0.5957723464972844},{"x":0.35397356565865784,"y":0.6012956825922857},{"x":0.3477598125517813,"y":0.6068190186872872},{"x":0.3394748084092792,"y":0.6123423547822885},{"x":0.33118980426677713,"y":0.6160245788456228},{"x":0.3249760511599006,"y":0.6215479149406241},{"x":0.31876229805302403,"y":0.6252301390039584},{"x":0.3115129194283347,"y":0.6289123630672927},{"x":0.30529916632145815,"y":0.634435699162294},{"x":0.2990854132145816,"y":0.6381179232256283},{"x":0.29287166010770505,"y":0.6436412593206297},{"x":0.2856222814830157,"y":0.6491645954156311},{"x":0.28044415389395194,"y":0.6546879315106324},{"x":0.2731947752692626,"y":0.6602112676056339},{"x":0.26698102216238606,"y":0.6657346037006352},{"x":0.2607672690555095,"y":0.6694168277639695},{"x":0.25455351594863296,"y":0.6730990518273037},{"x":0.24937538835956918,"y":0.6786223879223051},{"x":0.24212600973487985,"y":0.6841457240173064},{"x":0.23487663111019055,"y":0.6896690601123079},{"x":0.22762725248550122,"y":0.6951923962073092},{"x":0.22141349937862467,"y":0.6988746202706435},{"x":0.2162353717895609,"y":0.7025568443339778},{"x":0.2110572442004971,"y":0.706239068397312},{"x":0.20795036764705882,"y":0.7080801804289791},{"x":0.20795036764705882,"y":0.7080801804289791},{"x":0.20795036764705882,"y":0.7080801804289791},{"x":0.20795036764705882,"y":0.7080801804289791},{"x":0.20795036764705882,"y":0.7080801804289791},{"x":0.20795036764705882,"y":0.7080801804289791},{"x":0.20795036764705882,"y":0.7080801804289791},{"x":0.20795036764705882,"y":0.7080801804289791},{"x":0.20795036764705882,"y":0.7080801804289791},{"x":0.20795036764705882,"y":0.7080801804289791}]},{"size":118.57142857142857,"style":"x","paintStyle":"draw","stroke":[{"x":0.3819354546396023,"y":0.1336532265488355}]},{"size":118.57142857142857,"style":"x","paintStyle":"draw","stroke":[{"x":0.7671881472659486,"y":0.6620523796373009}]},{"size":118.57142857142857,"style":"x","paintStyle":"draw","stroke":[{"x":0.5352080312758907,"y":0.7577902052839915},{"x":0.5321011547224523,"y":0.7614724293473258},{"x":0.5289942781690141,"y":0.763313541378993},{"x":0.5269230271333886,"y":0.76515465341066},{"x":0.5258874016155758,"y":0.7669957654423272},{"x":0.5258874016155758,"y":0.7669957654423272},{"x":0.5258874016155758,"y":0.7669957654423272},{"x":0.5258874016155758,"y":0.7669957654423272},{"x":0.5258874016155758,"y":0.7669957654423272},{"x":0.5258874016155758,"y":0.7669957654423272},{"x":0.5258874016155758,"y":0.7669957654423272},{"x":0.5258874016155758,"y":0.7669957654423272},{"x":0.5258874016155758,"y":0.7669957654423272},{"x":0.5258874016155758,"y":0.7669957654423272},{"x":0.5258874016155758,"y":0.7669957654423272},{"x":0.5258874016155758,"y":0.7669957654423272},{"x":0.5258874016155758,"y":0.7669957654423272}]},{"size":118.57142857142857,"style":"x","paintStyle":"draw","stroke":[{"x":0.9277101025269262,"y":0.5718378900856117}]}],"settings":{"uVertex":18,"uWidth":23.405463646668814,"uRadius":0.007303767043204568,"uSpin":-0.11331348764961158,"uBias":0.7371918025546209,"uVertexHeight":0.09489626075113966,"speed":2.7062481909245975,"uRotationSpeed":0.010180196910813226,"uPointiness":0,"uPow":0.7501432856812845,"uPows":0,"uLr":0,"swatch 1":"160","swatch 2":"186","swatch 1 name":"Multi Color","swatch 2 name":"Multi Color"}}`

function VideoCard() {

  const [cData, setCData] = useState(testCData)
  const [renderId, setRenderId] = useState(null)
  const [startEndTimes, setStartEndTimes] = useState([])
  const [requestClicked, setRequestClicked] = useState(false)

  useEffect(() => {
    if (!requestClicked) {
      return
    }

    async function requestRender() {
      const resp = await fetch(`${REACT_APP_API_URL}/renderVideo`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cData })
      })
      const data = await resp.json()
      setRenderId( data.renderId )
      setStartEndTimes([ Date.now() ])
    }
    requestRender()
    setRequestClicked(false)
  }, [requestClicked])

  return (
      <div className="VideoCard">
        <div className="input-row">
          cData: <textarea value={cData}  onChange={(e) => setCData(e.target.value)} />
          <button className="request-render-button" 
            disabled={requestClicked || !!renderId}
            onClick={() => setRequestClicked(true)}>Request render</button>
        </div>

        {!!renderId &&
            <VideoFetcher
              renderId={renderId}
              onComplete={() => setStartEndTimes([ startEndTimes[0], Date.now() ]) }
              onCancel={() => setRenderId(null) }/>
        }
        
        { startEndTimes.length === 2 && <div> Complete time: { parseInt((startEndTimes[1] - startEndTimes[0])/1000 ) } sec </div> }
      </div>
  )
}

export default VideoCard
