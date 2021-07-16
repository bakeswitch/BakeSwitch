import React, { useState } from "react";
import styles from "./SearchBox.module.css";
import { Form, InputGroup, Row , Col, Button } from "react-bootstrap"
import { globalTagList } from "../../helperFunctions/handleTagsFunctions";

export default function SearchBox(props) {
    const [tag, setTag] = useState("");
 
    const { setSearchTag, 
        setIsDefault, 
        searchText, 
        searchRef,
        updateSearchBar} = props;

    function handleSubmit(e) {
        e.preventDefault();
        if (tag != "") {
            updateSearchBar(tag);
            setSearchTag(tag);
            setIsDefault(false);
        }
    }

    // function updateSearchBar(searchString) {
    //     searchRef.current.focus();
    //     setSearchText(searchString);
    // }

    return (
        <Form className={styles.form} onSubmit={handleSubmit}>
            <Row className="mb-4">
                <Form.Group as={Col} md="6" controlId="formSearchBar">
                    <Form.Label className="d-flex align-items-left">search keywords / #tags</Form.Label>
                    <InputGroup>
                        <Form.Control 
                            type="text" 
                            ref={searchRef} 
                            placeholder="search" 
                            value={searchText}
                            onChange = {e => setSearchText(e.target.value)}
                            readOnly/>
                        <Button 
                            type="submit" 
                            // onClick={() => }
                            // searchRef.current.value
                        >
                            Search
                        </Button>
                    </InputGroup>
                </Form.Group>

                <Form.Group className="ms-auto" as={Col} md="2" controlId="formSortBy">
                <Form.Label className="d-flex align-items-left">sort by</Form.Label>
                <Form.Control className="ms-auto" as="select" placeholder="-" defaultValue="Choose..." readOnly>
                    <option>Choose...</option>
                    <option>latest</option>
                    <option>price</option>
                    <option>popularity</option>
                </Form.Control>
                </Form.Group>
            </Row>

            <Row className="mb-4">
                <Form.Group as={Col} controlId="formBakeCategory">
                    <Form.Label className="d-flex align-items-left">bake category</Form.Label>
                    <Form.Control 
                        as="select" 
                        placeholder="Choose tag" 
                        onChange = {e => setTag(e.target.value)}
                        // onChange={e => setSearchTag(e.target.value)}
                    > 
                            <option value="">-select tag-</option>
                            { globalTagList.map(tag => (
                                <option value={tag}>{tag}</option>
                            ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="formBaker">
                    <Form.Label className="d-flex align-items-left">baker</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>

                <Form.Group xs="auto" as={Col} controlId="formDateStart">
                    <Form.Label className="d-flex align-items-left">from</Form.Label>
                    <Form.Control type="date" readOnly/>
                </Form.Group>

                <Form.Group xs="auto" as={Col} controlId="formDateEnd">
                    <Form.Label className="d-flex align-items-left">to</Form.Label>
                    <Form.Control type="date" readOnly />
                </Form.Group>
            </Row>
        </Form>

    );
}

