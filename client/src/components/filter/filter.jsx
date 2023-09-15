import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTeams, teamsFilter } from "../../redux/actions";
import './filter.css';

function TeamFilter() {
    const dispatch = useDispatch();
    const teams = useSelector((state) => state.teams);
    const selectedTeam = useSelector((state) => state.selectedTeam); // Asegúrate de tener un estado para el equipo seleccionado

    useEffect(() => {
        dispatch(getTeams());
    }, [dispatch]);

    const handleTeam = (e) => {
        const value = e.target.value;
        dispatch(teamsFilter(value));
    }

    return (
        <div className="filter">
            <select onChange={handleTeam} value={selectedTeam}>
                <option value="all">ALL</option>
                {teams.map((team) => (
                    <option key={team.id} value={team.name}>
                        {team.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default TeamFilter;
