import "./Footer.css";

function Footer() {
    return(
        <div id="footer-container"> 
          <div id="disclaimer2">
            REMINDER: This clone of Robinhood uses historical data and is in no way intended for professional use of any kind
          </div>

          <div className="names-container">
            <div className="name-container">
                <div>Ellen Park</div>
                <div className="connect-container">
                    <a href="https://github.com/pixzzels" target="_blank">
                        <i class="fab fa-github" aria-hidden="true"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/ellen-park-2b32a9172/" target="_blank">
                      <i class="fab fa-linkedin-in" aria-hidden="true"></i>
                    </a> 
                </div>
            </div>
            <div className="name-container">
                <div>Eunice Park</div>
                <div className="connect-container">
                    <a href="https://github.com/euniceparkk" target="_blank">
                      <i class="fab fa-github" aria-hidden="true"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/euniceparkk/" target="_blank">
                      <i class="fab fa-linkedin-in" aria-hidden="true"></i>
                    </a> 
                </div>
            </div>
            <div className="name-container">
                <div>Jack Radinger</div>
                <div className="connect-container">
                    <a href="https://github.com/JackRadinger" target="_blank">
                      <i class="fab fa-github" aria-hidden="true"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/jack-radinger-6b5349174/" target="_blank">
                      <i class="fab fa-linkedin-in" aria-hidden="true"></i>
                    </a> 
                </div>
            </div>
            <div className="name-container">
                <div>Schuler Small</div>
                <div className="connect-container">
                    <a href="https://github.com/ssmall1" target="_blank">
                      <i class="fab fa-github" aria-hidden="true"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/schuler-small/" target="_blank">
                      <i class="fab fa-linkedin-in" aria-hidden="true"></i>
                    </a> 
                </div>
            </div>
          </div>
        </div>
    )
}

export default Footer;