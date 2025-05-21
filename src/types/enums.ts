export enum Position {
	'PM',
	'PL',
	'AA',
	'TA',
	'DA',
	'QA',
	'FE',
	'BE',
	'FS',
}

export enum Skill {
	'JAVA',
	'JavaScript',
	'HTML/CSS',
	'React',
	'Vue.js',
	'Kotlin',
	'Spring',
}

export function getPosition(position: Position): string {
	return Position[position];
}

export function getSkill(skill: Skill): string {
	return Skill[skill];
}
