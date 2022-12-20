import { useState, useEffect } from 'react'
import VideoFetcher from './VideoFetcher'

const { REACT_APP_API_URL } = process.env

function VideoCard() {

  const [CID, setCID] = useState('QmTLbkXtXN21yykFkcyq7LL1UrB8h2D4vnrEdVhCe97sMh')
  const [renderId, setRenderId] = useState(null)
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
    }
    requestRender()
    setRequestClicked(false)
  }, [requestClicked])

  return (
      <div className="VideoCard">
        <div>
          CID: <input value={CID}  onChange={(e) => setCID(e.target.value)} />
          <button disabled={requestClicked || !!renderId} onClick={() => setRequestClicked(true)}>Request render</button>
        </div>
        {!!renderId &&
            <VideoFetcher
              renderId={renderId}
              onCancel={() => setRenderId(null) }/>
        }
        
      </div>
  )
}

export default VideoCard
