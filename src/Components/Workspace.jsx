import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useState, useEffect, useRef } from "react";

import QuoteViewer from './QuoteViewer';
import QuoteEditor from './QuoteEditor';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { API } from "aws-amplify";
import './Workspace.css';

import { QuoteController } from '../Controllers/Quote';

export default function Workspace() {

  const { user } = useAuthenticator();
  const [quoteList, setQuoteList] = useState({items: []});

  let isLoading = useRef(false)
  const firstFieldFocusReference = useRef(null);

  const quoteController = QuoteController(API);

  async function loadQuotes() {
    const allQuotes = await quoteController.loadAllQuotes();
    setQuoteList(quoteList => ({
      ...quoteList,
      items: allQuotes
    }));
    isLoading.current = false;
  }

  useEffect(() => {
    if(!isLoading.current) {
      isLoading.current = true;
      loadQuotes();
    }
    return () => {};

    // https://stackoverflow.com/questions/55840294/how-to-fix-missing-dependency-warning-when-using-useeffect-react-hook
    // loadQuotes is not reactive, so this lint makes no sense
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 
  
  
  const upsertQuoteHandler = async (quote) => {
    try {
      const savedQuote = await quoteController.upsertQuote(quote);
      console.info("Saved Quote:");
      console.info(savedQuote);
      loadQuotes();  
    } catch(ex) {
      console.error("Save quote FAILED:", ex);
    }
  }

  const deleteQuoteHandler = async (quoteId) => {
    try {
      await quoteController.deleteQuote(quoteId);
      loadQuotes();  
    } catch(ex) {
      console.error("Delete Quote FAILED:", ex);
    }
  };

  const onTabSelectHandler = (event) => {
    if(event === "quote-editor") {
      if(firstFieldFocusReference.current) {
        setTimeout(() => {
          document.getElementById(firstFieldFocusReference.current.id).focus();
        }, 500);
      }
    }
  };

  return (
    <div className="Workspace">
      <h2>Amp<span className="logo-stack">Stack</span> Workspace</h2>
      <p className="Workspace-preamble">
          All quotes are stored in DynamoDB and the application layer is a Serverless ExpressJS API backend.
      </p>
      <Tabs
        defaultActiveKey="quote-viewer"
        className="workspace-tabs"
        onSelect={onTabSelectHandler}
      >
        <Tab eventKey="quote-viewer" title="Quote Viewer">
          <Container className="workspace-tab">
              <Row>
                <Col>
                  <QuoteViewer quoteList={quoteList} />
                </Col>
              </Row>
          </Container>
        </Tab>
        <Tab eventKey="quote-editor" title="Quote Editor">
          <Container className="workspace-tab">
              <Row>
                <Col>
                  <QuoteEditor quoteList={quoteList} 
                    upsertQuoteHandler={upsertQuoteHandler}
                    deleteQuoteHandler={deleteQuoteHandler} 
                    user={user} 
                    firstFocusReference={firstFieldFocusReference}/>
                </Col>
              </Row>
          </Container>
        </Tab>
      </Tabs>
    </div>
  );
}