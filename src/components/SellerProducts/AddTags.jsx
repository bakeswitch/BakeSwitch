import React, { useState, useEffect } from "react";
import { Input, MenuItem, Select, Chip } from "@material-ui/core";
import { Form } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import { globalTagList } from "../../helperFunctions/handleTagsFunctions";

const useStyles = makeStyles(() => ({
	chips: {
		display: "flex",
		flexWrap: "wrap",
	},
	chip: {
		margin: 2,
	},
}));

const categories = globalTagList;

export default function AddTags(props) {
	const classes = useStyles();
	const [tags, setTags] = useState([]);

	const handleChange = (event) => {
		setTags(event.target.value);
	};

	useEffect(() => props.updateArr(tags), [tags]);

	return (
		<div>
			<Form.Group className="mt-4" controlId="formPdtTags">
				<Form.Label>Product Tags</Form.Label>
				<div>
					<Select
						id="pdtTags"
						multiple
						value={tags}
						onChange={handleChange}
						input={<Input id="select-pdtTags" />}
						renderValue={(selected) => (
							<div className={classes.chips}>
								{selected.map((value) => (
									<Chip key={value} label={value} className={classes.chip} />
								))}
							</div>
						)}
					>
						{categories.map((category) => (
							<MenuItem key={category} value={category}>
								{category}
							</MenuItem>
						))}
					</Select>
				</div>
				<Form.Text className="text-muted">
					Optional. Add product tags for the categories your product falls under.
				</Form.Text>
			</Form.Group>
		</div>
	);
}
