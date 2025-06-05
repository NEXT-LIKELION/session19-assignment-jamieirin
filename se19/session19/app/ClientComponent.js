'use client';

import React, {useState} from 'react';

export default function ClientComponent(){
    const [count, setCount] = useState(0);

    return(
        <div>
            <h2>클라이언트 컴포넌트</h2>
            <p>카운트: {count}</p>
            <button onClick={() => setCount(count + 1)}>증가</button>
        </div>
    )
}