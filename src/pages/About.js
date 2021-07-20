import React from "react";
import styles from "./pages.module.css";
import { Paper, Accordion, AccordionSummary, AccordionDetails } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

function QuestionBlock(props) {
	return (
		<Accordion className={styles.questionItem}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />} id={props.id}>
				<h6>{props.question}</h6>
			</AccordionSummary>
			<AccordionDetails>
				<p>{props.answer}</p>
			</AccordionDetails>
		</Accordion>
	);
}

export default function About() {
	const questionList = [
		{
			qn: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor?",
			ans: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		},
		{
			qn: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor?",
			ans: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Velit egestas dui id ornare arcu odio ut sem nulla. Mauris augue neque gravida in.",
		},
		{
			qn: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor?",
			ans: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		},
		{
			qn: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor?",
			ans: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Velit egestas dui id ornare arcu odio ut sem nulla. Mauris augue neque gravida in.",
		},
		{
			qn: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor?",
			ans: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		},
		{
			qn: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor?",
			ans: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Velit egestas dui id ornare arcu odio ut sem nulla. Mauris augue neque gravida in.",
		},
		{
			qn: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor?",
			ans: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		},
	];

	return (
		<div className={styles.contentBox}>
			<Paper className={styles.ourStory} elevation={2}>
				<h3 id="our-story" className="mt-5 mb-4">
					Our Story
				</h3>
				<p style={{ textAlign: "left" }}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
					ut labore et dolore magna aliqua. Velit egestas dui id ornare arcu odio ut sem nulla.
					Mauris augue neque gravida in. Neque laoreet suspendisse interdum consectetur libero id
					faucibus. Mauris sit amet massa vitae. Ac tortor dignissim convallis aenean et. Dolor
					morbi non arcu risus quis varius quam.
				</p>
				<p style={{ textAlign: "left" }}>
					Fermentum iaculis eu non diam. Viverra maecenas accumsan lacus vel facilisis volutpat est
					velit egestas. Ut venenatis tellus in metus vulputate eu scelerisque. Aliquam etiam erat
					velit scelerisque in. Sapien nec sagittis aliquam malesuada bibendum arcu. Tristique
					sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula. Pharetra et ultrices
					neque ornare aenean euismod elementum nisi quis. Arcu cursus euismod quis viverra nibh
					cras pulvinar mattis. Habitant morbi tristique senectus et netus et malesuada fames.
					Facilisis sed odio morbi quis commodo. Gravida neque convallis a cras semper auctor neque
					vitae.
				</p>
			</Paper>

			<div className="mb-5">
				<h3 id="faq" className="mt-5 mb-4">
					FAQ
				</h3>
				<div className={styles.questionBox}>
					{questionList.map((questionItem, index) => (
						<QuestionBlock
							question={questionItem.qn}
							answer={questionItem.ans}
							key={index}
							id={index}
						/>
					))}
				</div>
			</div>

			<Paper className={styles.contact} elevation={4}>
				<h3 id="contact" className="mt-2 mb-2">
					Contact
				</h3>
				<p className="mb-2">
					For enquiries and feedback, contact us at <em>bakeswitch@gmail.com</em>
				</p>
			</Paper>
		</div>
	);
}
