import React from "react"
import DefaultTooltipContent from "recharts/lib/component/DefaultTooltipContent"

/**
 * Custom tooltip from https://github.com/recharts/recharts/issues/275#issuecomment-483149280
 * @param {*} props
 */
const CustomTooltip = (props) => {
	// we don't need to check payload[0] as there's a better prop for this purpose
	if (!props.active) {
		// I think returning null works based on this: http://recharts.org/en-US/examples/CustomContentOfTooltip
		return null
	}
	// mutating props directly is against react's conventions
	// so we create a new payload with the name and value fields set to what we want
	const newPayload = [
		{
			name: "Name",
			// all your data which created the tooltip is located in the .payload property
			value: props.payload[0].payload.name,
			// you can also add "unit" here if you need it
		},
		...props.payload,
	]

	// we render the default, but with our overridden payload
	return <DefaultTooltipContent {...props} payload={newPayload} />
}

export { CustomTooltip }
