import React from "react";

export default function Data(props){
    console.log(props.item.googleMapsUrl)
    console.log(props.item.imageUrl)
    return (
        <div>
            <h1>{props.item.title}</h1>
            <p>{props.item.location}</p>
            <a href={props.item.googleMapsUrl}>asd</a>
            <img src={props.item.imageUrl}></img>
        </div>
    )
}