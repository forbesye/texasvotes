import React from 'react';
import DevBio from 'components/cards/DevBio.js'
import styles from 'views/About/About.module.css'

const About = () => {
    return(
        <div className={styles.wrapper}>
            <div className={styles.flexbox}>
                <DevBio
                    name="Jefferson Ye" 
                    bio="ayy lmao" 
                    picture_path="https://image.shutterstock.com/image-vector/male-default-avatar-profile-gray-260nw-362901362.jpg" 
                />
                <DevBio 
                    name="Jefferson Ye" 
                    bio="ayy lmao" 
                    picture_path="https://image.shutterstock.com/image-vector/male-default-avatar-profile-gray-260nw-362901362.jpg" 
                />
                <DevBio 
                    name="Jefferson Ye" 
                    bio="ayy lmao" 
                    picture_path="https://image.shutterstock.com/image-vector/male-default-avatar-profile-gray-260nw-362901362.jpg" 
                />
                <DevBio 
                    name="Jefferson Ye" 
                    bio="ayy lmao" 
                    picture_path="https://image.shutterstock.com/image-vector/male-default-avatar-profile-gray-260nw-362901362.jpg" 
                />
                <DevBio 
                    name="Jefferson Ye" 
                    bio="ayy lmao" 
                    picture_path="https://image.shutterstock.com/image-vector/male-default-avatar-profile-gray-260nw-362901362.jpg" 
                />
                <DevBio 
                    name="Jefferson Ye" 
                    bio="ayy lmao" 
                    picture_path="https://image.shutterstock.com/image-vector/male-default-avatar-profile-gray-260nw-362901362.jpg" 
                />
            </div>
        </div>
    );
}

export default About