import * as React from 'react';
import './Components.css';

interface Row {
    Cols: string[];
    Index: number;
}

interface MainState {
    Entries: Row[];
    EditMode: boolean;
}

export class Main extends React.Component<{}, MainState> {

    constructor() {
        super();

        //Alternatively we can fetch this data from a db.
        this.state = {
            Entries: [
                {
                    Cols: [
                        'Entry 1',
                        'Entry 2',
                        'Entry 3'
                    ],
                    Index: 0
                },
                {
                    Cols: [
                        'Entry 4',
                        'Entry 5',
                        'Entry 6'
                    ],
                    Index: 1
                },
                {
                    Cols: [
                        'Entry 7',
                        'Entry 8',
                        'Entry 9'
                    ],
                    Index: 2
                }
            ],

            EditMode: false
        };
    }

    UpdateRow = (e: any, pos: number, index: number) => {

        const oldRow = this.state.Entries[index];
        
        const newRow = oldRow;
        newRow.Cols[pos] = e.target.value;

        const oldEntries = this.state.Entries;
        oldEntries[index] = newRow;

        // This isn't too bad but we are mutating state a litte, and could use immutability helpers
        this.setState({
            Entries: oldEntries
        });
    }

    ChangeMode = () => {
        this.setState({
            EditMode: !this.state.EditMode
        });
    }

    render() {
        const body = this.state.EditMode ?
            this.state.Entries.map(x => <EditEntry Entries={x.Cols} Row={x} Update={this.UpdateRow} />) :
            this.state.Entries.map(x => <ViewEntry Index={x.Index} Cols={x.Cols} /> );

        return (
            <div className="main">
                <a href="#" onClick={this.ChangeMode}>Edit</a>
                {body}
            </div>
        );
    }
}

const ViewEntry = (props: Row) =>
    <div className="view-entry">
        {props.Cols.map(x => <p>{x}</p>)}
    </div>;

interface EditEntryProps {
    Row: Row;
    Entries: string[];
    Update(e: any, pos: number, index: number): void;
}

const EditEntry = (props: EditEntryProps) =>
    <div className="edit-entry">
        {props.Entries.map(x => 
            <input onChange={(e) => props.Update(e, props.Entries.indexOf(x), props.Row.Index)} value={x} />
        )}
    </div>;