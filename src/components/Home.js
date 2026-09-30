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
    'TypeScript',
    'Java',
    'Swift',
    'Python',
    'SQL',
    'React',
    'React Native',
    'Next.js',
    'GatsbyJS',
    'Tailwind CSS',
    'Material UI',
    'Bootstrap',
    'Node',
    'Express',
    'FastAPI',
    'Flask',
    'GraphQL',
    'REST APIs',
    'API Development',
    'OpenAI API',
    'MongoDB',
    'PostgreSQL',
    'MySQL',
    'SQLAlchemy',
    'Alembic',
    'Pydantic',
    'Database Management',
    'OAuth 2.0',
    'JWT Auth',
    'Git',
    'GitHub',
    'Docker',
    'Vite',
    'pytest',
    'Jupyter Notebook',
    'Postman',
    'Mapbox GL',
    'PWA',
    'Claude',
    'GPT',
    'GitHub Copilot',
    'Netlify',
    'Render',
    'Jira',
    'Unity',
    'C',
    'R',
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
    'Tableau',
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

  reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  atmosphereRef = React.createRef();

  handleHeroPointerMove = (e) => {
    if (this.reducedMotion || !this.atmosphereRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    this.atmosphereRef.current.style.transform =
      `translate3d(${relX * -16}px, ${relY * -12}px, 0) scale(1.06)`;
  };

  handleHeroPointerLeave = () => {
    if (!this.atmosphereRef.current) return;
    this.atmosphereRef.current.style.transform = 'translate3d(0, 0, 0) scale(1.06)';
  };

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
            <div
              className="introHeader snap-section"
              onMouseMove={this.handleHeroPointerMove}
              onMouseLeave={this.handleHeroPointerLeave}
            >
              <div className="hero-atmosphere" ref={this.atmosphereRef}>
                <div className="hero-grade" />
                <div className="hero-grain" />
              </div>
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
                    I create, develop, market. 
                  </h4>
                  <br></br>
                  <p>I have a passion for <b>optimization</b>. Process, Algorithmic, Workflow, and Generic.</p>
                  
                  <p>I've livestreamed in front of over 10,000 concurrent viewers.</p>
                  <p>I've collaborated with brands such as <b>Taco Bell, AT&T, and more.</b></p>
                  <p>I've generated over <b>$100,000</b> through consultation and brand growth.</p>
                  <p>I've helped teach over 100 students Fullstack Development and Data Analytics.</p>

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
