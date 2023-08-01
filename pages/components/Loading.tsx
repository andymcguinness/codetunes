import React, { Component, ReactElement } from "react"
import { ClockLoader } from 'react-spinners'

function Loading({ loaded, artist, title }: { loaded: any; artist: any; title: any; }): ReactElement {
    return (
        <div className="flex gap-2 [&>*]:my-auto">
            {loaded ? '' : <ClockLoader size={20} color="white" />}
            <div>{loaded ? "Title: " + title + ", Artist: " + artist : 'Loading...'}</div>
        </div>
    )
}

export default Loading;