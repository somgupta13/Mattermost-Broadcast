import React from 'react';
import {add} from '../actions';

import { Multiselect } from 'multiselect-react-dropdown';


import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import {FormattedMessage} from 'react-intl';


export default class RHSView extends React.PureComponent {
	constructor(props){
		super(props);
		var options=[];
    		 Object.values(this.props.team).map(user=>{
    		 		console.log(user.username);
    		 		options.push({name:user.username,id:user.id});
    		 	});
		this.state = {
			options:options,
			selectedList:[],
			message:null,
		};
	}
    	
    onSelect(selectedList, selectedItem) {
    	this.setState({selectedList:selectedList});
	}

	onRemove(selectedList, removedItem) {
	    this.setState({selectedList:selectedList});
	}
	onMessage(message){
		this.setState({message:message});
		// console.log(this.state);
	}
	submit(){
		// console.log(this.state);
		add(this.state.message,this.state.selectedList);
		// this.setState({message:null});
	}
    render() {
        return (
			<div>
				<Modal.Body>
							<div>
							{/* <Form.Label>Select Users</Form.Label> */}
							<FormattedMessage
								id='plugin.name'
								defaultMessage='Select Users'
							/>
								<Multiselect
										options={this.state.options} // Options to display in the dropdown
										selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
										onSelect={(selectedList, selectedItem) =>this.onSelect(selectedList, selectedItem) } // Function will trigger on select event
										onRemove={(selectedList, selectedItem) =>this.onRemove(selectedList, selectedItem) } // Function will trigger on remove event
										displayValue="name" // Property name to display in the dropdown options
										placeholder="Select Users"
										closeOnSelect={false}
										// showCheckbox={true} //checkbox inactive
										avoidHighlightFirstOption={true}
										// value={this.state.message}
									/>
							</div>
							<br/>
							<br/>
							<br/>
							<br/>
							<br/>
							<br/>
							
							<div>
								<Form.Group controlId="exampleForm.ControlTextarea1">
									<FormattedMessage
										id='plugin.name'
										defaultMessage='Message'
									/>
									<Form.Control onChange={event=>{this.onMessage(event.target.value)}} as="textarea" placeholder="Message"rows="3" />
								</Form.Group>
							</div>
						</Modal.Body>
							<br/>
							<br/>
							<br/>
						<Modal.Footer>
							<Button variant="success" onClick={()=>this.submit()}>Send Message</Button>
						</Modal.Footer>		
			</div>
				   
        );
    }
}



