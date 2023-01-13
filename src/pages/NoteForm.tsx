import React, { FormEvent, useRef, useState } from 'react'
import { Col, Form, FormGroup, Row, Stack, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CreatableReactSelect from "react-select/creatable"
import { NoteData, Tag } from '../App'

type NoteFormProps = {
    onSubmit: (data: NoteData) => void
}

export function NoteForm({ onSubmit }: NoteFormProps) {
    const titleRef = useRef<HTMLInputElement>(null)
    const markdown = useRef<HTMLTextAreaElement>(null)
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])

    function handleSubmit(e: FormEvent){
        e.preventDefault();

        onSubmit({
            title: titleRef.current!.value,
            markdown: markdown.current!.value,
            tags: []
        })
    }

  return (
    <Form onSubmit={handleSubmit}>
        <Stack gap={4}>
            <Row>
                <Col>
                <FormGroup controlId='title'>
                    <Form.Label>Title</Form.Label>
                    <Form.Control ref={titleRef} required />
                </FormGroup>
                </Col>
                <Col>
                <FormGroup controlId='tags'>
                    <Form.Label>Tags</Form.Label>
                    <CreatableReactSelect value={selectedTags.map(tag => {
                        return {label:tag.label, value:tag.id}
                    })} isMulti/>
                </FormGroup>
                </Col>
            </Row>
                <FormGroup controlId='markdown'>
                    <Form.Label>Body</Form.Label>
                    <Form.Control ref={markdown} required as='textarea' rows={15}/>
                </FormGroup>
            <Stack direction='horizontal' gap={2} className='justfiy-content-end'>
                <Button type='submit' variant='primary'>
                    Save
                </Button>
                <Link to='..'>
                    <Button type='button' variant='outline-secondary'>
                        Cancel
                    </Button>
                </Link>

            </Stack>
        </Stack>
    </Form>
  )
}