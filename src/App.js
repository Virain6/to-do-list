//resourses 
//https://www.youtube.com/watch?v=mDgKjb5eWPk
import './App.css';
import { useState , useEffect} from 'react';
import { Container , Badge, ListGroup, Stack, Button, ToggleButtonGroup, ToggleButton, Card} from 'react-bootstrap';

function App() {

  const [tests] = useState([
    {id:1, name: 'Activate', def: 'Activities related to OutDoor', num: 14, tags:['Indoor','Physical']},
    {id:2, name: 'Bowling', def: 'Activities related to In', num: 1, tags:['Indoor','Physical', 'Chill', 'Drinking', 'Food']},
    {id:3, name: 'Golf', def: 'Activities related to Sitting', num: 14, tags:['Outdoor','Physical', 'Chill', 'Drinking', 'Food']},
    {id:4, name: 'Pottery', def: 'Activities related to Physical', num: 14, tags:['Indoor','Art', 'Critical, Chill']},
    {id:5, name: 'Downtown', def: 'Activities related to OutDoor', num: 14, tags:['Outdoor','Physical', 'Chill', 'Drinking', 'Food']},
    {id:6, name: 'Card Games', def: 'Activities related to OutDoor', num: 14, tags:['Indoor','Critical', 'Chill', 'Drinking', 'Food']}
  ]);

  const [filteredTests, setFilteredTests] = useState(tests);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);

  const tags = [{id:1, var:'primary', name:'Indoor'},
                {id:2, var:'secondary', name:'Physical'},
                {id:3, var:'success', name:'Chill'},
                {id:4, var:'danger', name:'Drinking'},
                {id:5, var:'warning', name:'Art'},
                {id:6, var:'info', name:'Critical'},
                {id:7, var:'dark', name:'Food'},]

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

  useEffect(() => {
    handleTagSelection(selectedTags);
  }, [selectedTags]);
              
  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className='mb-4'>
        <h1 className='me-auto'>TDL</h1>
        <Button variant='primary'>Add Activity</Button>
        <Button variant='primary'>Add Tag</Button>
        <Button variant='outline-primary'>Generate Random</Button>
        </Stack>
      </Container>
      <Container>
        <Stack direction="horizontal" gap="2" className='mb-4'>
          <ToggleButtonGroup type="checkbox">
            {tags.map((tag) => (
                <ToggleButton 
                  id={`tag-btn-${tag.id}`} 
                  key={tag.id} 
                  value={tag.name} 
                  onChange={handleToggle}
                  checked = {selectedTags.includes(tag.name)}
                  
                  >{tag.name}</ToggleButton>
              ))}
          </ToggleButtonGroup>
        </Stack>
      </Container>
      <Container direction="horizontal" className="my-4" align='start'>
        <Stack direction="horizontal" gap="2" className="flex-grow-1 align-items-start">
          <ListGroup as='ol' className='me-auto' numbered>
            {filteredTests
            .map((test) => (
              <ListGroup.Item action as='li' className="d-flex justify-content-between align-items-start" key = {test.id} onClick={()=> handleTestSelection(test)}>
              <div className="ms-2 me-auto">
                <div className="fw-bold">{test.name}</div>
                {test.def}
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
          <div className="ml-5" style={{ flex: '1' }}>
            {selectedTest && (<Card>
              <Card.Body>
                <Card.Title>{selectedTest.name}</Card.Title>
                <Card.Subtitle>{tags
                    .filter((tag) => selectedTest.tags.includes(tag.name))
                    .map((tag) => (
                      <Badge key={tag.id} bg={tag.var}>{tag.name}</Badge>
                    ))}</Card.Subtitle>
                <Card.Text>{selectedTest.def}</Card.Text>
              </Card.Body>
            </Card>)}
          </div>
        </Stack>
      </Container>
    </>
  );
}

export default App;
