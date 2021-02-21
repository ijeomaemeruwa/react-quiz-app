import React from 'react';
import Card from 'react-bootstrap/Card';

const Header = () => {
return (
<>
<header>
<Card className="mx-auto my-5 card__container">
<Card.Body className="card__body">
    <Card.Title className="card__title">
    Quiz App
    </Card.Title>
    <Card.Subtitle className="mb-2 text-muted">
        Short description of the quiz name and purpose
    </Card.Subtitle>
</Card.Body>
</Card>           
</header>      
</>
    )
}

export default Header
