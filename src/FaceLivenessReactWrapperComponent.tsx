// Importing necessary Angular and external dependencies
import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FaceLivenessDetector } from '@aws-amplify/ui-react-liveness';
import * as AWS from 'aws-sdk';
import awsmobile from './aws-exports';

// Name for the container element where the React component will be mounted
const containerElementName = 'faceLivenessReactContainer';

@Component({
    selector: 'app-faceliveness-react-wrapper',
    // Angular component template with a span acting as a container for React component
    template: `<span #${containerElementName}></span>`,
    // No encapsulation for styles to avoid any styling issues with the React component
    encapsulation: ViewEncapsulation.None,
})
export class FaceLivenessReactWrapperComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
    // Reference to the container element using ViewChild
    @ViewChild(containerElementName, { static: true }) containerRef!: ElementRef;

    // Input properties for the component
    @Input() public counter = 10;
    @Input() public sessionId = null;
    
    // Output events for emitting liveness results and errors
    @Output() public livenessResults = new EventEmitter<any>();
    @Output() public livenessErrors = new EventEmitter<any>();

    // AWS region from aws-exports file
    region = awsmobile['aws_project_region']

    // Constructor
    constructor() {
    }

    // Angular lifecycle hook - Component initialization
    ngOnInit(): void {
        console.log('Component Loaded' + this.sessionId)
    }

    // Angular lifecycle hook - Handling changes in input properties
    ngOnChanges(changes: SimpleChanges): void {
        // Re-render the React component when there are changes in input properties
        this.render();
    }

    // Angular lifecycle hook - After the view is initialized
    ngAfterViewInit() {
        // Render the React component after the view is initialized
        this.render();
    }

    // Angular lifecycle hook - Component destruction
    ngOnDestroy() {
        // Unmount the React component when the Angular component is destroyed
        ReactDOM.unmountComponentAtNode(this.containerRef.nativeElement);
    }

    // Function to handle the completion of face liveness analysis
    handleAnalysisComplete = async () => {
        // Create AWS Rekognition client
        var rekognition = new AWS.Rekognition();

        // Parameters for getting face liveness session results
        var params = {
            SessionId: this.sessionId
        };

        // Fetch face liveness session results and emit the data
        rekognition.getFaceLivenessSessionResults(params).promise().then(data => {
            this.livenessResults.emit(data);
            console.log(data);
        }).catch(err => {
            console.log(err);
        });
    }

    // Function to handle errors during face liveness analysis
    handleError = async (err: any) => {
        // Emit the error to the parent component
        this.livenessErrors.emit(err);
    }

    // Function to render the React component within the Angular component
    private render() {
        // Destructure counter from component properties
        const { counter } = this;

        // Render the React component inside the specified container
        ReactDOM.render(
            <React.StrictMode>
                <div>
                    {/* React component for face liveness detection */}
                    <FaceLivenessDetector sessionId={this.sessionId} region={this.region} 
                        onAnalysisComplete={this.handleAnalysisComplete} onError={this.handleError}
                    />
                </div>
            </React.StrictMode>
            , this.containerRef.nativeElement);
    }
}
