import React from "react";
import styles from "./pages.module.css";
import { Paper, Accordion, AccordionSummary, AccordionDetails } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { questionList } from "../helperData/faq";
import {Button} from 'react-bootstrap'
function QuestionBlock(props) {
	return (
		<Accordion className={styles.questionItem}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />} id={props.id}>
				<h6>{props.question}</h6>
			</AccordionSummary>
			<AccordionDetails>
				{props.answer}
				{/* answer returns a react component */}
			</AccordionDetails>
		</Accordion>
	);
}

export default function About() {
	return (
		<div className={styles.contentBox}>
			<Paper className={styles.ourStory} elevation={2}>
				<h3 id="our-story" className="mt-5 mb-4">
					Our Story
				</h3>
				<p style={{ textAlign: "left" }}>
					We are a group of undergraduate Computing Students at NUS. We came together to build this website after realising that our home baker friends who were selling their product faced similar struggles.
					Home bakers generally lack the support of well funded organisations and we hope to be able to help them.
				</p>
				<p style={{ textAlign: "left" }}>
					We aim to make it effortless for home bakers in Singapore to set up their baking business online by providing an interactive web-based platform as the bakers central store. 
					This platform is designed to be used hand in hand with social media platforms to leverage on their effectiveness (chat, sharing & outreach capabilities). 
					Being a centralized store, customers will be able to view a wide variety of baked goods from different home bakers, and contact them directly for order via their preferred method of contact.
				</p>
				<p style={{ textAlign: "left" }}>
					Bakeswitch is an online marketplace web app that will have features beneficial to both buyer and seller users. Buyers are able to browse product listings from sellers and sellers are able to list products and bake sales, and manage orders from buyers. 
				</p>
				<p style={{ textAlign: "left" }}>
					We would love to hear your experience using BakeSwitch and appreciate if you could take time to fill in this google form. Let us know how we can better improve the product! <br/>
					<br/>
					<Button onClick={() => {window.open("https://docs.google.com/forms/d/e/1FAIpQLSf18UDAs9UZeffoeInLE1xrg16ZdPCPqP2aVOWv8S0F3zFnPg/viewform", '_blank', 'noopener,noreferrer')}}>Give us valuable feedback!</Button>
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
