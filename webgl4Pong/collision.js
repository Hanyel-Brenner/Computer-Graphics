function isPointInArea(point, rectangle){
    let x1 = rectangle[0], y1 = rectangle[1];
    let x2 = x1 + rectangle[2], y2 = y1 + rectangle[3];
    
    var leftBound, rightBound, upperBound, lowerBound;

    
    if(rectangle[2] > 0) {
        leftBound = x1;
        rightBound = x2;
    }
    else {
        leftBound = x2;
        rightBound = x1;
    }

    if(rectangle[3] > 0){
        lowerBound = y1;
        upperBound = y2;
    }
    else{
        lowerBound = y2;
        upperBound = y1;
    }

    if(point[0] >= leftBound && point[0] <= rightBound && point[1] >= lowerBound && point[1] <= upperBound)
        return true;
    return false;
}

function redefineBallPointsOfContact(ball, radius){
    return {
        leftPoint : [ ball[0] - radius, ball[1]],
        rightPoint : [ ball[0] + radius, ball[1]],
        lowerPoint : [ ball[0] , ball[1] - radius ],
        upperPoint : [ ball[0] , ball[1] + radius ]
    };
}
