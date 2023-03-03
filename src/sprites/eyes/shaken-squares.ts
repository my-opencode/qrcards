import { EyeSprites, IEyePosObj } from "../EyeSprites";

const definitions = `<g id="eye" x="0" y="0">
		<polygon class="st2" points="13.3,0.4 0.3,87.4 87.3,100.4 100.3,13.4"/>
		<polygon class="st2" points="100.3,17.4 183.3,0.4 200.3,83.4 117.3,100.4"/>
		<polygon class="st2" points="200.3,10.4 290.3,0.4 300.3,90.4 200.3,100.4"/>
		<polygon class="st2" points="300.3,15.4 385.3,0.4 400.3,85.4 315.3,100.4"/>
		<polygon class="st2" points="400.3,12.4 488.3,0.4 500.3,88.4 412.3,100.4"/>
		<polygon class="st2" points="522.3,0.4 500.3,78.4 578.3,100.4 600.3,22.4"/>
		<polygon class="st2" points="615.3,5.4 605.3,85.4 685.3,95.4 695.3,15.4"/>
		<polygon class="st2" points="0.3,115.4 85.3,100.4 100.3,185.4 15.3,200.4"/>
		<polygon class="st2" points="600.3,112.4 688.3,100.4 700.3,188.4 612.3,200.4"/>
		<polygon class="st2" points="22.3,200.4 0.3,278.4 78.3,300.4 100.3,222.4"/>
		<polygon class="st2" points="615.3,205.4 605.3,285.4 685.3,295.4 695.3,215.4"/>
		<polygon class="st2" points="0.3,310.4 90.3,300.4 100.3,390.4 0.3,400.4"/>
		<polygon class="st2" points="600.3,315.4 685.3,300.4 700.3,385.4 615.3,400.4"/>
		<polygon class="st2" points="0.3,412.4 88.3,400.4 100.3,488.4 12.3,500.4"/>
		<polygon class="st2" points="622.3,400.4 600.3,478.4 678.3,500.4 700.3,422.4"/>
		<polygon class="st2" points="0.3,515.4 85.3,500.4 100.3,585.4 15.3,600.4"/>
		<polygon class="st2" points="600.3,512.4 688.3,500.4 700.3,588.4 612.3,600.4"/>
		<polygon class="st2" points="13.3,600.4 0.3,687.4 87.3,700.4 100.3,613.4"/>
		<polygon class="st2" points="100.3,617.4 183.3,600.4 200.3,683.4 117.3,700.4"/>
		<polygon class="st2" points="200.3,610.4 290.3,600.4 300.3,690.4 200.3,700.4"/>
		<polygon class="st2" points="300.3,615.4 385.3,600.4 400.3,685.4 315.3,700.4"/>
		<polygon class="st2" points="400.3,612.4 488.3,600.4 500.3,688.4 412.3,700.4"/>
		<polygon class="st2" points="522.3,600.4 500.3,678.4 578.3,700.4 600.3,622.4"/>
		<polygon class="st2" points="615.3,605.4 605.3,685.4 685.3,695.4 695.3,615.4"/>
    </g>`;

const useIds: IEyePosObj = {
	topleft: `eye`,
	topright: `eye`,
	bottomleft: `eye`
};

export const sprites = new EyeSprites(
	`Shaken squares`,
	definitions,
	useIds
);