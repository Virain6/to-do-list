import {Badge, ListGroup} from 'react-bootstrap';

export default function ActivityItem({ test, selection, tags, darkMode, selectedTest}) {
    const darkModeListGroup = (test) => {
        const baseStyle = {
          backgroundColor: selectedTest === test
            ? darkMode ? '#343a40' : '#E1E1E1'
            : darkMode ? '#181818' : '#F6F7F8',
          color: darkMode ? '#FFFFFF' : '#000000',
          border: darkMode ? '1px solid rgba(0,0,0,0)' : '0.75px solid rgba(0,0,0,0.0)',
          transition: 'background-color 0.3s', // Optional: Add a smooth transition effect
        };
      return baseStyle
    };

    function truncateText(text, maxLength) {
      return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
    }
    
    return(
        <ListGroup.Item 
          action as='li' 
          className="d-flex justify-content-between align-items-start" 
          key = {test.id} 
          onClick={selection} 
          style={darkModeListGroup(test)}
        >
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
        </ListGroup.Item>)
}