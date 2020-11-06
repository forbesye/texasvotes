
// Very naive algorithm that assigns a like-ness score through char counts
function mostAlike(str1, str2) {
	const m1 = new Map()
	const m2 = new Map()
	for (const c of str1) {
		m1.set(c, (m1.get(c) || 0) + 1)
	}
	for (const c of str2) {
		m2.set(c, (m2.get(c) || 0) + 1)
	}
	let inCommon = 0
	let different = 0
	// Roughly count common chars and penalize for different chars
	for (const [k, v] of m1) {
		const other = m2.get(k)
		if (other) {
			inCommon += Math.min(v, other)
			different += Math.max(v, other) - inCommon
		} else {
			different += v
		}
	}
	return inCommon - different
}

function getMatchIndices(str, toMatch) {
	str = str.toLowerCase()
	toMatch = toMatch.toLowerCase()
	let bestStart = 0,
		bestEnd = -1
	for (let i = 0; i < str.length; i++) {
		// Find matching stuff
		let start = i,
			end = i
		while (
			end < str.length &&
			end - start < toMatch.length &&
			str[end] === toMatch[end - start]
		) {
			end++
		}
		if (end - start > bestEnd - bestStart) {
			bestStart = start
			bestEnd = end
		}
	}
	return [bestStart, bestEnd]
}

export {
    mostAlike,
    getMatchIndices
}