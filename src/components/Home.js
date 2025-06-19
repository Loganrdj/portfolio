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
    'JavaScript',
    'Python',
    'Jira',
    'Unity',
    'C',
    'R',
    'Tableau',
    'MongoDB',
    'Express',
    'Node',
    'MySQL',
    'SQL',
    'Database management',
    'API Development',
    'TCP/IP',
    'AWS'
  ],
  Marketing: [
    'SEO',
    'Email Campaigns',
    'Webinar Campaigns',
    'Chatbot Direction',
    'Project Management',
    'Data Analytics',
    'Google Analytics',
    'Marketo',
    'HubSpot',
    'SurveyMonkey',
    'Google Tag Manager',
    'Salesforce',
    'Slack',
    'Zapier',
    'Airtable',
    'Asana',
    'GoToMarket'
  ],
  Content: [
    'Writing/Copywriting',
    'Video Editing',
    'Graphic Design',
    'Adobe Suite',
    'Photoshop',
    'Adobe Premiere Pro/Rush',
    'Adobe Audition',
    'Campaign Management',
    'Content Strategy',
    'Corporate Collaboration',
    'Sponsorship Management',
    'Trends',
    'OBS'
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
    const currentSkill =
      rotatingSkills.length > 0
        ? rotatingSkills[currentSkillIndex]
        : rotatingSkillList[0];
    const skills = skillCategories[selectedCategory];
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
                <a href="#bg-bottom" className="see-more-link">See more &gt;</a>
              </div>
            </div>
            <div id="bg-bottom" className="homeContent snap-section">
              <div className="jumbotron aboutMeDiv">
                <div className="about-description">
                  <h2>What do I do?</h2>
                  <h4>
                    I develop, market, create. 
                  </h4>
                  <br></br>
                  <p>I have a passion for <b>optimization</b>. Process, Algorithmic, Workflow, and Generic.</p>
                  <p>I've helped teach over 100 students Fullstack Development and Data Analytics.</p>
                  
                  <p>I've livestreamed in front of over 10,000, have had the wonderful opportunity to work with brands such as, Taco Bell, AT&T, and more...</p>
                  <p>Twitch Partner, Chess.com affiliate, PC Enthusiast, Grand Champion — Rocket League</p>
                </div>
                <div className="skills-section">
                  <h2>Skills</h2>
                  <div className="skills-container">
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
                    <div className="skills-list">
                      <ul>
                        {skills.map(skill => (
                          <li key={skill}>{skill}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <p className="creation-label">Designed and coded by Logan Moss</p>
            </div>
          </div>
        </div>
    );
  } 
}

export default withRouter(Home);
