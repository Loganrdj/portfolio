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

const skillCategories = {
  Development: [
    'HTML',
    'CSS',
    'JavaScript'
  ],
  Marketing: [
    'SEO',
    'Email Campaigns',
    'Analytics'
  ],
  'Content Creation': [
    'Writing',
    'Video Editing',
    'Graphic Design'
  ]
};

class Home extends Component{

  state = {
    rotatingSkills: [],
    currentSkillIndex: 0,
    selectedCategory: 'Development'
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

  handleCategoryClick = (category) => {
    this.setState({ selectedCategory: category });
  }

  render(){
    const { rotatingSkills, currentSkillIndex, selectedCategory } = this.state;
    const { hideStep = -1 } = this.props;
    const currentSkill =
      rotatingSkills.length > 0
        ? rotatingSkills[currentSkillIndex]
        : rotatingSkillList[0];
    const skills = skillCategories[selectedCategory];
    return (
        <div className="jumbotron jumbotron-fluid jumboSpacing">
          <div className={`backgroundImg ${hideStep >= 1 ? 'fade-out' : ''}`}>
            <div className="introHeader snap-section">
              <div className={`centerTextDiv ${hideStep >= 0 ? 'fade-out' : ''}`}>
                <p className="firstName">Logan</p>
                <p className="lastName">Moss</p>
              </div>
              <div className={`skill-flash-container ${hideStep >= 0 ? 'fade-out' : ''}`}>
                <div className="skill-flash-text">{currentSkill}</div>
                <a href="#bg-bottom" className="see-more-link">See more</a>
              </div>
            </div>
            <div id="bg-bottom" className={`homeContent snap-section ${hideStep >= 0 ? 'fade-out' : ''}`}>
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
                  <div className="skill-buttons">
                    {Object.keys(skillCategories).map(category => (
                      <button
                        key={category}
                        onClick={() => this.handleCategoryClick(category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                  <ul>
                    {skills.map(skill => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </div>
    );
  } 
}

export default withRouter(Home);
