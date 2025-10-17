import React from 'react';
import NavBar from './NavBar';
import FabricTest from './Fabric';
import MdxEditor from './MdxEditor.tsx';

const initialContent = `
# Hey!

This is a basic ReMirror Markdown starter. 
`;

function LeandingPage() {
    return (
        <>
        <NavBar />
            <MdxEditor initialContent={initialContent} />,
        <FabricTest />
        </>
    );
}

export default LeandingPage;
