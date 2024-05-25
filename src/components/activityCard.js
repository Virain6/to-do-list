import { Badge, Stack, Button, Card, CloseButton, ProgressBar, ButtonGroup} from 'react-bootstrap';
import { FaArrowUp, FaArrowDown} from "react-icons/fa";

export default function ActivityCard({selectedTest, tags, darkMode, exit, incrementNum, reductionNum, maxNum}){
    const darkModeListGroup = (test) => {
        const baseStyle = {
          backgroundColor: selectedTest === test
            ? darkMode ? '#343a40' : '#E1E1E1'
            : darkMode ? '#181818' : '#F6F7F8',
          color: darkMode ? '#FFFFFF' : '#000000',
          border: darkMode ? '1px solid rgba(0,0,0,0)' : '0.75px solid rgba(0,0,0,0.0)',
          transition: 'background-color 0.3s', // Optional: Add a smooth transition effect
        };
        return baseStyle;
    };
    
    const exitTestSelection = () => {
        exit(null);
    }
    
    return(
        <Card style={darkModeListGroup()}>
            <Card.Body>
                <Card.Title className='d-flex mb-4'><div className='me-auto'>{selectedTest.name}</div> 
                    <CloseButton bg="primary" onClick={()=> exitTestSelection()} variant={darkMode ? 'white': 'grey'}/>
                </Card.Title>
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
                <Stack direction='horizontal' gap='2' className='d-flex justify-content-end'>
                    <Button variant='primary'>Edit</Button>
                    <Button variant='danger'>Delete</Button>
                </Stack>
            </Card.Body>
        </Card>
    )
}