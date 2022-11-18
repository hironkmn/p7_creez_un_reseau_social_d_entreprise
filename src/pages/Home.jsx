import ButtonAppBar from "../components/Home/AppBar";
import Burger from "../components/Home/Burger"
import React from "react";
import AddPost from "../components/Home/AddPost";
import Pagination from "../components/Home/Pagination";

function Home() {

    return (
        <div id="outer-container" style={{ height: "100%" }}>
            <ButtonAppBar />
            <main id="page-wrap" style={{ height: "100%" }}>
                <AddPost />
                <Pagination />
            </main>
        </div>
    )
}

export default Home;