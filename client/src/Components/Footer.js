import React from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

function Footer() {
    return (
        <div className="footer">
            <a
            style={{  paddingLeft: "1em" }}
            href="https://github.com/kimmyphua"
            target="_blank"
          ><GitHubIcon/></a>
              <a
            style={{  paddingLeft: "1em" }}
            href="https://www.linkedin.com/in/kimberlyphua/"
            target="_blank"
          ><LinkedInIcon/></a>
              <h5 style={{  paddingLeft: "0.5em" }}>♥ Created by Kimberly Phua </h5>
        </div>
    )
}

export default Footer
