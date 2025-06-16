import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import "../App.css";

const rotatingSkillList = [
  'JavaScript',
  'Python',
  'Java',
  'Unity',
  'C',
  'Marketo',
  'Airtable',
  'Zapier',
  'Slack'
];

class Home extends Component{

  state = {
    rotatingSkills: [],
    currentSkillIndex: 0
  }

  componentDidMount() {
    const shuffled = [...rotatingSkillList].sort(() => Math.random() - 0.5);
    this.setState({ rotatingSkills: shuffled });
    this.interval = setInterval(() => {
      this.setState(prev => ({
        currentSkillIndex: (prev.currentSkillIndex + 1) % shuffled.length
      }));
    }, 3000);
  }

  componentDidUpdate(prevProps) {
    // No scroll handling needed here; ScrollToTop manages anchor scrolling
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render(){
    const { rotatingSkills, currentSkillIndex } = this.state;
    const currentSkill =
      rotatingSkills.length > 0
        ? rotatingSkills[currentSkillIndex]
        : rotatingSkillList[0];
    return (
        <div className="jumbotron jumbotron-fluid jumboSpacing">
          <div className="backgroundImg">
            <div className="introHeader snap-section">
              <div className="centerTextDiv">
                <p className="firstName">Logan</p>
                <p className="lastName">Moss</p>
              </div>
              <div className="skill-flash-container">
                <div className="skill-flash-text">{currentSkill}</div>
                <a href="#bg-bottom" className="see-more-link">See more</a>
              </div>
            </div>
            <div id="bg-bottom" className="homeContent snap-section">
              <div className="jumbotron aboutMeDiv">
                <div className="about-description">
                  <h2>About Me</h2>
                  <p>
                    I am a developer with a passion for learning new
                    technologies and building useful applications.
                  </p>
                </div>
                <div className="skills-section">
                  <h2>Skills</h2>
                  <ul>
                    {rotatingSkillList.map(skill => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="contact-link">
                Email: <a href="mailto:lrdjmoss@gmail.com">lrdjmoss@gmail.com</a>
              </div>
            </div>
          </div>

        </div>
    );
  } 
}

export default withRouter(Home);
