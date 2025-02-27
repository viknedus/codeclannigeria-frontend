import styled from 'styled-components';


const StyledTeam = styled.div`
.pry-padd-form{
  padding: 0 30px 30px;
 padding: 0 clamp(24px, 6vw, 120px) 30px;
}
.title{
    color: #12376d;
    text-align: center;
    font-weight: 700;
    font-size: 3.5rem;
}
  .our-team{
    overflow: hidden;
    border-radius: 50%;
    position: relative;
}
.image-container{
    width: 100%;
    object-fit:cover;
}
.our-team img{
    width: 100%;
    height: auto;
    position: relative;
    right: 0;
    transition: all 0.4s ease-in-out 0s;
}
.our-team:hover img{
    right: 60%;
}
.our-team .team-content{
    width: 80%;
    height: 100%;
    background: #f1f1f1;
    padding: 20% 30px 0;
    position: absolute;
    top: 0;
    right: -80%;
    transition: all 0.4s ease-in-out 0s;
}
.our-team:hover .team-content{
    right: 0;
}
.our-team .title{
    font-size: 22px;
    color: #8e0c80;
    margin: 0 0 10px 0;
}
.our-team .post{
    display: block;
    font-size: 12px;
    font-weight: 900;
    color: #333;
    text-transform: uppercase;
    margin-bottom: 20px;
}
.our-team .description{
    font-size: 14px;
    color: #333;
}
.our-team .social{
    padding: 0;
    margin: 0;
    list-style: none;
}
.our-team .social li{
    display: inline-block;
    margin-right: 10px;
}
.our-team .social li:last-child{
    margin-right: 0;
}
.our-team .social li a{
    display: block;
    width: 36px;
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    color: #999;
    border-radius: 4px;
    text-align: center;
    transition: all 0.3s ease-in-out 0s;
}
.our-team .social li a:hover{ color: #fff; }
.our-team .social li a.fa-github:hover{ background: #000; }
.our-team .social li a.fa-twitter:hover{ background: #2baae1; }
.our-team .social li a.fa-linkedin:hover{ background: #0077b5; }
@media only screen and (max-width: 990px){
    .our-team{ margin-bottom: 50px; }
}
@media only screen and (max-width: 360px){
    .team-content{ padding: 15% 15px 0; }
    .our-team .social li{ margin-right: 0; }
}
`



export default StyledTeam;
