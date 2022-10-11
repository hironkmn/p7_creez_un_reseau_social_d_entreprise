import ButtonAppBar from "../components/Home/AppBar";
import Burger from "../components/Home/Burger"
import React from "react";
import AddPost from "../components/Home/AddPost";

function Home() {

    return (
        <div>
            <Burger pageWrapId={'page-wrap'} outerContainerId={'out-container'} />
            <ButtonAppBar />
            <AddPost />
        </div>
    )
}

export default Home;