import React, {Suspense} from 'react'
//import {useImage} from 'react-image'

function MyImageComponent() {
  //const {src} = useImage({
  //  srcList: 'http://127.0.0.1:8000/frame',
  //})
  const src = 'http://127.0.0.1:8000/frame';
  //return <img src={src} />;
  return (<>
            <img src="http://127.0.0.1:8000/frame" className="logo" alt="Vite logo"/>
        </>)
}

export default function MyComponent() {
  return (
    <>
      <MyImageComponent />
    </>
  )
}