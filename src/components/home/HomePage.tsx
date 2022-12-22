import React from "react";

interface HomeProps {

}

// eslint-disable-next-line no-empty-pattern
const HomePage: React.FC<HomeProps> = ({}) => {
    return (
        <article className="home">
            <h2 className="home__title">Secret Cipher</h2>
            <p className="home__intro">
                Hello! Welcome to <span className="italics">Secret Cipher</span> !<br/>
                <br/>
                Here you can send a secret message [pun intended ;-) ] to someone
                encoded with a key that only the both of you will know, or only you
                know and that person can guess~
            </p>
        </article>
    )
}

export default HomePage;