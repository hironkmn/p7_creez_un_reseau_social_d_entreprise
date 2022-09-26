import logo from '../../assets/icon-left-font.png'


function Banner(){
    return(
        <div className="banner">
            <header>
                <img src={logo} alt='Logo Groupomania'/>
            </header>
        </div>
    )
}

export default Banner;