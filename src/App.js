//resourses 
//https://www.youtube.com/watch?v=mDgKjb5eWPk
import './App.css';
import { useState , useEffect} from 'react';
import { Container , Badge, ListGroup, Stack, Button, ToggleButtonGroup, ToggleButton, Card, CloseButton, ProgressBar, ButtonGroup} from 'react-bootstrap';
import { FaMoon, FaArrowUp, FaArrowDown} from "react-icons/fa";
import { ImShuffle } from "react-icons/im";
import { IoSunny } from "react-icons/io5";
import { TfiArrowDown } from "react-icons/tfi";

function App() {
  // sample data
  const [tests] = useState([
    {id:1, name: 'Activate', def: 'Activities related to OutDoor for fun and having blah blah and about how blah blah blah can blahblah blah how blah blah blah ', num: 14, tags:['Indoor','Physical']},
    {id:2, name: 'Bowling', def: 'Activities related to In', num: 1, tags:['Indoor','Physical', 'Chill', 'Drinking', 'Food']},
    {id:3, name: 'Golf', def: 'Activities related to Sitting', num: 10, tags:['Outdoor','Physical', 'Chill', 'Drinking', 'Food']},
    {id:4, name: 'Pottery', def: 'Activities related to Physical', num: 24, tags:['Indoor','Art', 'Critical, Chill']},
    {id:5, name: 'Downtown', def: 'Activities related to OutDoor', num: 7, tags:['Outdoor','Physical', 'Chill', 'Drinking', 'Food']},
    {id:6, name: 'Card Games', def: 'Activities related to OutDoor', num: 19, tags:['Indoor','Critical', 'Chill', 'Drinking', 'Food']}
  ]);

  // variables
  const [filteredTests, setFilteredTests] = useState(tests);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [maxNum, setMaxNum] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  const tags = [{id:1, var:'primary', name:'Indoor'},
                {id:2, var:'secondary', name:'Physical'},
                {id:3, var:'success', name:'Chill'},
                {id:4, var:'danger', name:'Drinking'},
                {id:5, var:'warning', name:'Art'},
                {id:6, var:'info', name:'Critical'},
                {id:7, var:'dark', name:'Food'},]

  // dark mode contols 
  const darkModeStyles ={
    backgroundColor: darkMode ? '#121212' : '#D4D4D4',
    color: darkMode ? '#FFFFFF' : '#000000',
    minHeight: '100vh',
    overflow: 'hidden',
    transition: 'background-color 0.3s',
  }

  // fix hover color chnage 
  const darkModeListGroup = (test) => {
    const baseStyle = {
      backgroundColor: selectedTest === test
        ? darkMode ? '#343a40' : '#E1E1E1'
        : darkMode ? '#181818' : '#F6F7F8',
      color: darkMode ? '#FFFFFF' : '#000000',
      border: darkMode ? '1px solid rgba(0,0,0,0)' : '0.75px solid rgba(0,0,0,0.0)',
      transition: 'background-color 0.3s', // Optional: Add a smooth transition effect
    };
  
    const hoverStyle = {
      backgroundColor: darkMode ? '#FFFFFF' : 'black', // Optional: Change color on hover
      color: darkMode ? 'black' : 'white', // Optional: Change text color on hover
    };
  
    return {
      ':hover': hoverStyle,
      ...baseStyle,
    };
  };
  

  const getToggleDarkStyle= (tag) =>{
    return{
    backgroundColor: selectedTags.includes(tag.name) ? darkMode ? '#343a40' : 'rgb(41, 98, 244)' : darkMode ? '#181818' : '#F6F7F8',
    color: selectedTags.includes(tag.name) ? darkMode ? '#FFFFFF' : '#FFFFFF' : darkMode ? '#FFFFFF' : '#000000',
    border: '0px'
    }
  }

  const changeMode = () => {
    setDarkMode(!darkMode);
  }

  // getting icon 
  const getIcon = () =>{
      return darkMode ?(
        <FaMoon size={25} style={{color:'white', marginLeft:'20px', transition: 'color 0.3s',}}
        onClick={() => changeMode()}/>
      ):(
      <IoSunny size={25} style={{color:'black', marginLeft:'20px', transition: 'color 0.3s',}}
      onClick={() => changeMode()}/>
      )
  }
  // random generator 
  const generateRandom = () => {
    const randomInteger = Math.floor(Math.random() * (filteredTests.length));
    handleTestSelection(filteredTests[randomInteger]);
  }

  // filter for tags 
  const handleTagSelection = (selectedTags) => {
    if (selectedTags.length === 0) {
      setFilteredTests(tests);
    } else {
      const filtered = tests.filter((test) => {
        return selectedTags.every((selectedTag) => test.tags.includes(selectedTag));
      });
      setFilteredTests(filtered);
    }
  };

  const handleToggle = (e) => {
    const selectedTag = e.target.value;
    const isChecked = e.target.checked;

    setSelectedTags((prevSelectedTags) => {
      if (isChecked) {
        return [...prevSelectedTags, selectedTag];
      } else {
        return prevSelectedTags.filter((tag) => tag !== selectedTag);
      }
    });

  };
  const handleTestSelection = (test) => {
    setSelectedTest(test);
  }
  const exitTestSelection = () => {
    setSelectedTest(null);
  }

  // chnaging number of times the activities done 
  const incrementNum= (selectedTest) => {
    if(selectedTest){
      setSelectedTest({...selectedTest, num: selectedTest.num+1});
    }
      console.log(selectedTest.num);
  }

  const reductionNum= (selectedTest) => {
    if(selectedTest && selectedTest.num > 0){
      setSelectedTest({...selectedTest, num: selectedTest.num-1});
    }
    console.log(selectedTest.num);
}

// limiting list group text (def) length 
function truncateText(text, maxLength) {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}


// re rendering 
  useEffect(() => {
    handleTagSelection(selectedTags);
    
  }, [selectedTags]);

  useEffect(() => {
    let currentMax = 0;
    for(let i = 0; i<filteredTests.length; i++) {
      if(filteredTests[i].num > currentMax) {
        currentMax = filteredTests[i].num;
        setMaxNum(currentMax);
      }
    }
  },[filteredTests]);
  // ...
  
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const storedDarkMode = JSON.parse(localStorage.getItem('darkMode'));
    setDarkMode(storedDarkMode || false);
  }, []);


  return (
    <>
    <div style={darkModeStyles}>
        <Container className="my-4">
          <Stack direction="horizontal" gap="2" className='mb-4'>
          <h1 className='me-auto'>What To Do?</h1>
          <Button variant='success'>Log In</Button>
          <Button variant='outline-success'>Sign Up</Button>
          {getIcon()}
          </Stack>
        </Container>
        <Container>
          <Stack direction="horizontal" gap="2" className='w-100 mb-4'>
            <Stack direction="horizontal" gap="2" className='me-auto'>
              <ToggleButtonGroup type="checkbox" style={{border:'0px'}}>
                <ToggleButton style={{background: darkMode ? '#343a40' : 'rgb(41, 98, 244)', border:'0px' }}>Filters:</ToggleButton>
                {tags.map((tag) => (
                    <ToggleButton 
                      style={getToggleDarkStyle(tag)}
                      id={`tag-btn-${tag.id}`} 
                      key={tag.id} 
                      value={tag.name} 
                      onChange={handleToggle}
                      checked = {selectedTags.includes(tag.name)}
                    >{tag.name}</ToggleButton>
                  ))}
              </ToggleButtonGroup>
            </Stack>
            <Stack direction="horizontal" gap="2" className=''>
              <Button variant='primary'>Add Activity</Button>
              <Button variant='primary'>Add Tag</Button>
              <Button variant='outline-primary' onClick ={()=> generateRandom()}><ImShuffle size={25}/></Button>
            </Stack>
          </Stack>
        </Container>
        <Container>
          <Stack direction="horizontal" gap="2" className="align-items-start">
            <ListGroup as='ol' className='w-100' numbered style={darkModeListGroup()}> 
              {filteredTests
              .map((test) => (
                <ListGroup.Item action as='li' className="d-flex justify-content-between align-items-start" key = {test.id} onClick={()=> handleTestSelection(test)} style={darkModeListGroup(test)}>
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{test.name}</div>
                  {truncateText(test.def, 50)}
                  <div>
                    {tags
                    .filter((tag) => test.tags.includes(tag.name))
                    .map((tag) => (
                      <Badge key={tag.id} bg={tag.var}>{tag.name}</Badge>
                    ))}
                  </div>
                </div>
                <Badge key="A" bg='primary' pill>{test.num}</Badge>
              </ListGroup.Item>
              ))}
            </ListGroup>
            <div className="ml-5 w-100">
              {selectedTest && (<Card style={darkModeListGroup()}>
                <Card.Body>
                  <Card.Title className='d-flex mb-4'><div className='me-auto'>{selectedTest.name}</div> 
                  <CloseButton bg="primary" onClick={()=> exitTestSelection()} variant={darkMode ? 'white': 'grey'}/></Card.Title>
                  <Card.Subtitle className='d-flex mb-4'>
                    <div className='me-3 flex-fill'>
                      {tags
                      .filter((tag) => selectedTest.tags.includes(tag.name))
                      .map((tag) => (
                        <Badge key={tag.id} bg={tag.var}>{tag.name}</Badge>
                      ))}
                      <ProgressBar className='mt-1 ' style={{ backgroundColor: '#E5E5E5' }} now={(selectedTest.num/maxNum)*100} label={`${selectedTest.num}`}/>
                    </div>
                    <ButtonGroup >
                      <Button variant="outline-danger" onClick={()=> reductionNum(selectedTest)} style={{border:'0px'}}><FaArrowDown /></Button>
                      <Button variant="outline-success" onClick={()=> incrementNum(selectedTest)} style={{border:'0px'}}><FaArrowUp /></Button>
                    </ButtonGroup>
                  </Card.Subtitle>
                  <Card.Text className='mb-4'>{selectedTest.def}</Card.Text>
                  <Stack direction='horizontal' gap='2' className='d-flex justify-content-end' >
                    <Button variant='primary'>Edit</Button>
                    <Button variant='danger'>Delete</Button>
                  </Stack>
                </Card.Body>
              </Card>)}
            </div>
          </Stack>
        </Container>
      </div>
    </>
  );
}

export default App;
