import React, {Component} from 'react';
import './GameComponent.css';

class GameComponent extends Component {
    constructor(args) {
        super(args);

        this.state = {
            gameWinner: null,
            gameDataMatris: [['', '', ''], ['', '', ''], ['', '', '']]
        };

        this.handleSelectIndex = this.handleSelectIndex.bind(this);
        this.isGameFinisihed = this.isGameFinisihed.bind(this);
        this.playComputer = this.playComputer.bind(this);
        this.controlEmptyArea = this.controlEmptyArea.bind(this);
    }


    handleSelectIndex(xCoordinate, yCoordinate) {
        if (this.state.gameDataMatris[xCoordinate][yCoordinate] !== '') {
            return;
        }

        this.state.gameDataMatris[xCoordinate][yCoordinate] = 'X';
        let copyValue = this.state.gameDataMatris;
        this.setState({
            gameDataMatris: copyValue
        });

        let conclusion = this.isGameFinisihed();

        if (conclusion) {
            this.setState({
                gameWinner: 'X Player'
            });
            return;
        }

        let countEmpty = this.controlEmptyArea();
        if (countEmpty === 9) {
            this.setState({
                gameWinner: 'Scoreless'
            });
            return;
        }


        this.playComputer();

        conclusion = this.isGameFinisihed();

        if (conclusion) {
            this.setState({
                gameWinner: 'O Player'
            });
            return;
        }
    }


    controlEmptyArea() {
        let matris = this.state.gameDataMatris;
        let count = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (matris[i][j] !== '') {
                    count++;
                }
            }
        }
        return count;
    }

    isGameFinisihed() {
        let matris = this.state.gameDataMatris;
        for (let i = 0; i < 3; i++) {

            if (matris[i][0] && matris[i][0] === matris[i][1] &&
                matris[i][0] === matris[i][2]) {
                return true;
            }

            if (matris[0][i] && matris[0][i] === matris[1][i] &&
                matris[0][i] === matris[2][i]) {
                return true;
            }
        }
        if (matris[0][0] &&
            matris[0][0] === matris[1][1] &&
            matris[0][0] === matris[2][2]) {
            return true;
        }
        if (matris[0][2] &&
            matris[0][2] === matris[1][1] &&
            matris[0][2] === matris[2][0]) {
            return true;
        }
    }


    playComputer() {
        while (true) {
            let estimateX = Math.floor(Math.random() * 3);
            let estimateY = Math.floor(Math.random() * 3);

            if (this.state.gameDataMatris[estimateX][estimateY] == '') {
                this.state.gameDataMatris[estimateX][estimateY] = 'O';
                let copyValue = this.state.gameDataMatris;
                this.setState({
                    gameDataMatris: copyValue
                });
                break;
            }
        }


    }

    render() {
        const matris = this.state.gameDataMatris;


        if (this.state.gameWinner == null) {
            return (



                <div className="board-game">
                    <h2>How to the play game? This is guide</h2>
                    <table className="typewriter">
                        <tbody>
                        <tr>
                            <td
                                onClick={() => this.handleSelectIndex(0, 0)}>{matris[0][0]}</td>
                            <td className="vertical"
                                onClick={() => this.handleSelectIndex(0, 1)}>{matris[0][1]}</td>
                            <td
                                onClick={() => this.handleSelectIndex(0, 2)}>{matris[0][2]}</td>
                        </tr>
                        <tr>
                            <td className="horizontal"
                                onClick={() => this.handleSelectIndex(1, 0)}>{matris[1][0]}</td>
                            <td className="vertical horizontal"
                                onClick={() => this.handleSelectIndex(1, 1)}>{matris[1][1]}</td>
                            <td className="horizontal"
                                onClick={() => this.handleSelectIndex(1, 2)}>{matris[1][2]}</td>
                        </tr>
                        <tr>
                            <td
                                onClick={() => this.handleSelectIndex(2, 0)}>{matris[2][0]}</td>
                            <td className="vertical"
                                onClick={() => this.handleSelectIndex(2, 1)}>{matris[2][1]}</td>
                            <td onClick={() => this.handleSelectIndex(2, 2)}>{matris[2][2]}</td>
                        </tr>
                        </tbody>
                    </table>

                </div>
            );
        } else {
            return (
                <div>
                    <h1 className="board-game">Winner is {this.state.gameWinner}</h1>
                </div>
            );
        }
    }
}

export default GameComponent;