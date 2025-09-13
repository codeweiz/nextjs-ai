import Link from "next/link";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@microboat/component/ui";

export default function Home() {
	const items = [
		{
			id: 1,
			question: "问题一",
			answer: "回答一",
		},
		{
			id: 2,
			question: "问题二",
			answer: "回答二",
		},
		{
			id: 3,
			question: "问题三",
			answer: "回答三",
		},
	];

	return (
		<div className="overflow-x-hidden">
			<div className="w-full h-full flex justify-center items-center">
				主页 会议纪要
			</div>

			<Link className="text-sky-300" href="/app/dashboard">
				点击跳转仪表盘
			</Link>

			<Accordion
				type="single"
				collapsible
				className="mx-auto w-full lg:max-w-3xl"
			>
				{items.map((item, index) => (
					<AccordionItem
						key={`${item.id}-${index}`}
						value={`${item.id}-${index}`}
					>
						<AccordionTrigger className="transition-opacity duration-200 hover:no-underline hover:opacity-60 cursor-pointer">
							<div className="font-medium sm:py-1 lg:py-2 lg:text-lg">
								{item.question}
							</div>
						</AccordionTrigger>
						<AccordionContent className="sm:mb-1 lg:mb-2">
							<div className="text-muted-foreground lg:text-lg">
								{item.answer}
							</div>
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
}
