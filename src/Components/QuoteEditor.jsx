import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Markdown from 'react-markdown'

import './QuoteEditor.scss';

export default function QuoteEditor({quoteList, 
    upsertQuoteHandler, 
    deleteQuoteHandler, 
    user,
    firstFocusReference}) {

  const ADD_QUOTE_BUTTON_TEXT_DEFAULT = "Add Quote";
  const ADD_QUOTE_BUTTON_TEXT_CONFIRM = "Confirm";
  const ADD_QUOTE_BUTTON_TEXT_EDIT = "Update Quote";
  
  const [quoteIdValue, setQuoteIdValue] = React.useState("");
  const [quoteTextValue, setQuoteTextValue] = React.useState("");
  const [quoteAuthorValue, setQuoteAuthorValue] = React.useState("");

  const [showQuoteTextError, setShowQuoteTextError] = React.useState(false);
  const [showQuoteAuthorError, setShowQuoteAuthorError] = React.useState(false);

  const [addQuoteButtonText, setAddQuoteButtonText] = React.useState(ADD_QUOTE_BUTTON_TEXT_DEFAULT);

  const resetQuoteEditForm = () => {
    setQuoteIdValue("");
    setQuoteTextValue("");
    setQuoteAuthorValue("");
    setAddQuoteButtonText(ADD_QUOTE_BUTTON_TEXT_DEFAULT);
  }

  const editQuoteHandler = (quote) => {
    console.log(`EDIT QUOTE: ${quote.quoteId}`);

    setQuoteIdValue(quote.quoteId);
    setQuoteTextValue(quote.text);
    setQuoteAuthorValue(quote.author);
    setAddQuoteButtonText(ADD_QUOTE_BUTTON_TEXT_EDIT);
  };

  const deleteQuoteLocalHandler = (quote) => {
    resetQuoteEditForm();
    deleteQuoteHandler(quote);
  };

  const getQuoteList = quotes => {
    let content = [];

    quotes.items.map((quote, index) => {
      let className = "d-flex justify-content-between align-items-start";
      if(index % 2 == 0) {
         className += " even-row"; 
      } else { 
        className += " odd-row"
      }
  
      content.push(
        <ListGroup.Item key={quote.quoteId} className={className}>
          <div>
            <div className="QuoteEditor-list-quote-text"><Markdown>{quote.text}</Markdown></div>
            <div className="QuoteEditor-list-quote-author" > - <Markdown>{quote.author === "" ? "Anonymous" : quote.author}</Markdown></div>
          </div>
          <div className="QuoteEditor-list-edit-toolbar">
          { user && quote.submittedBy === user.username ? (
            <>
            <a className="QuoteEditor-list-edit-button bi bi-pencil" onClick={() => editQuoteHandler(quote)} ></a>
            <a className="QuoteEditor-list-delete-button bi bi-trash" onClick={() => deleteQuoteLocalHandler(quote.quoteId)} ></a>
            </>
          ) : (<></>) 
          }
          </div>
        </ListGroup.Item>
        );
    });
    return content;
  };
  
  const editQuoteCancelButtonClickHandler = () => {
    resetQuoteEditForm();
  }
  
  const addQuoteButtonClickHandler = () => {

    if(quoteTextValue === "" ) {
      setShowQuoteTextError(true);
      setTimeout(() => {
        setShowQuoteTextError(false);
      }, 5000);
      return;
    }

    if(quoteAuthorValue === "" && 
      (addQuoteButtonText === ADD_QUOTE_BUTTON_TEXT_DEFAULT ||
        addQuoteButtonText === ADD_QUOTE_BUTTON_TEXT_EDIT)) {
      setShowQuoteAuthorError(true);
      setTimeout(() => {
        setShowQuoteAuthorError(false);
      }, 5000);
      setAddQuoteButtonText(ADD_QUOTE_BUTTON_TEXT_CONFIRM);
      return;
    }
    
    let quoteToPost = {
      "text": quoteTextValue,
      "author": quoteAuthorValue,
      "submittedBy": user.username,
      "submittedDate": Date()
    };

    if(quoteIdValue) {
      quoteToPost.quoteId = quoteIdValue;
    } else {
      quoteToPost.quoteId = crypto.randomUUID();
    }
    upsertQuoteHandler(quoteToPost);
    
    resetQuoteEditForm();
  };
  
  const getQuoteTextAlert = () => {
    if(showQuoteTextError) {
      return (
        <Alert variant="danger" onClose={() => setShowQuoteTextError(false)} dismissible>
        <p>Something must be added or it isn&apos;t a quote!</p>
        </Alert>
      );
    }
  }

  const getQuoteAuthorAlert = () => {
    if(showQuoteAuthorError) {
      return (
        <Alert variant="info" onClose={() => setShowQuoteAuthorError(false)} dismissible>
        <p>If Author is left blank the quote will be attributed to Anonymous.</p>
        </Alert>
      );
    }
  }

  const getEditCancelButton = () => {
    if(quoteIdValue) {
      return (
        <Form.Group as={Col} md="2" controlId="formCancelEditButton">
          <Form.Label>&nbsp;</Form.Label>
          <Button variant="secondary" 
            type="button" 
            size="sm" 
            className="QuoteEditor-cancel-button form-control"
            onClick={() => editQuoteCancelButtonClickHandler()} >Cancel Edit</Button>
        </Form.Group>
      );
    }
  }

  const quoteTextOnChangeEvent = (event) => {
    setQuoteTextValue(event?.target.value);
    setAddQuoteButtonText(quoteIdValue ? ADD_QUOTE_BUTTON_TEXT_EDIT : ADD_QUOTE_BUTTON_TEXT_DEFAULT);
  }

  const quoteAuthorOnChangeEvent = (event) => {
    setQuoteAuthorValue(event?.target.value);
    setAddQuoteButtonText(quoteIdValue ? ADD_QUOTE_BUTTON_TEXT_EDIT : ADD_QUOTE_BUTTON_TEXT_DEFAULT);
  }

  return (
    <div className="QuoteEditor">
      <Form data-bs-theme="dark">
      <Row>
        <Form.Group as={Col} md="10" controlId="formQuote">
          <Form.Label>Quote: (markdown is supported)</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={1} 
            value={quoteTextValue}
            autoFocus={true}
            aria-describedby="quoteTextBlock"
            onChange={(event) => quoteTextOnChangeEvent(event)}
            ref={firstFocusReference} 
            placeholder="Say something mystical" />
          { getQuoteTextAlert() }
        </Form.Group>
        { getEditCancelButton() }
      </Row>
      <Row>
        <Form.Group as={Col} md="10" controlId="formAuthor">
          <Form.Label>Author</Form.Label>
          <Form.Control 
            placeholder="Anonymous"
            onChange={(event) => quoteAuthorOnChangeEvent(event)}
            value={quoteAuthorValue}
            />
          { getQuoteAuthorAlert() }
        </Form.Group>
        <Form.Group as={Col} md="2" controlId="formAddButton">
          <Form.Label>&nbsp;</Form.Label>
          <Button variant={addQuoteButtonText === ADD_QUOTE_BUTTON_TEXT_CONFIRM ? "warning" : "primary"}
            type="button" 
            size="sm" 
            className="QuoteEditor-add-button form-control"
            onClick={() => addQuoteButtonClickHandler()} >{addQuoteButtonText}</Button>
        </Form.Group>
      </Row>
      </Form>
      <hr />
      <div className="QuoteEditor-listing-header">Quotes: ({quoteList.items.length})</div>
      <ListGroup data-bs-theme="dark" className="QuoteEditor-listing">{ getQuoteList(quoteList) }</ListGroup>
    </div>
);
}