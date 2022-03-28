import React, { useRef, useState } from "react"

export default function Delete() {
    const videoLink = useRef("")
    const [video, setVideo] = useState(false)
    const [items, setItems] = useState([])

    const matchYoutubeUrl = (url) => {
        var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
        var matches = url.match(p)
        if (matches) {
            return matches[1]
        } else {
            alert("Please enter a valid link!")
        }
        return false;
    }
    const convertVideo = () => {
        if (videoLink.current.value === "") {
            alert("Don't forget the link...")
        } else {
            const newUrl = matchYoutubeUrl(videoLink.current.value)
            if (newUrl !== false) {
                setVideo(true)
                const apiUrl = "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" + newUrl + "&key=AIzaSyApPZkflrrRncAjxmgAg2L7tYPiUhjqRVo"
                fetch(apiUrl)
                    .then(response => response.json())
                    .then(data => {
                        setItems(data.items)
                        console.log(data)
                    })
            }
        }
    }
    return (
        <>
            {/* <img src={logo} id="logo" alt={logo} /> */}
            <h1>Converter Youtube</h1>
            <div id="App">
                <div className="inputs">
                    <input type="text" placeholder="Video Link" ref={videoLink} autoFocus />
                    <input type="button" value="CONVERT VIDEO" onClick={() => convertVideo()} id="convert" />
                </div>
                <div style={{display: video ? "inline" : "none"}}>
                    {
                        items.map((item, key) => {
                                var description
                                if (item.snippet.description !== "") {
                                    description = item.snippet.description.substring(0, 100) + "..."
                                }
                                return (
                                    <div key={key}>
                                        <img src={item.snippet.thumbnails.high.url} height={item.snippet.thumbnails.default.height+50} width={item.snippet.thumbnails.default.width+50} alt={item.snippet.title} id="image" />
                                        <div id="channel"><p id="title">{item.snippet.title}</p></div>
                                        <p id="description">{description}</p>
                                        <a href="sdadsa.png" download={`${item.snippet.title}.mp3`}>
                                            <button type="button">Download</button>
                                        </a>
                                    </div>
                                )
                            }
                        )
                    }
                </div>
            </div>
            <div id="App" className="footer">
                <span>Copyright 2021</span>
            </div>
        </>
    )
}