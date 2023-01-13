import { useState, useEffect } from 'react'
import VideoFetcher from './VideoFetcher'

const { REACT_APP_API_URL } = process.env

function VideoCard() {

  const [CID, setCID] = useState('QmTLbkXtXN21yykFkcyq7LL1UrB8h2D4vnrEdVhCe97sMh')
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
        body: JSON.stringify({ CID })
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
        <div>
          CID: <input value={CID}  onChange={(e) => setCID(e.target.value)} />
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
