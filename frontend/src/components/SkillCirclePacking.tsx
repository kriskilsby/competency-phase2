// frontend/src/components/SkillCirclePacking.tsx
'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { fetchSkillVolumes } from '@/lib/api';
import { HierarchyCircularNode } from 'd3';

type SkillRow = {
  sector: string;
  skill: string;
  usage_volume: number;
};

export default function SkillCirclePacking() {
    const svgRef = useRef<SVGSVGElement>(null);



    function renderChart(rows: SkillRow[]) {
        if (!svgRef.current) return;

        // Clear previous chart
        d3.select(svgRef.current).selectAll('*').remove();

        const width = svgRef.current.clientWidth || 1200;
        const height = 1200;

        // Prepare hierarchical data
        const data = {
        name: 'Skills',
        children: d3.groups(rows, d => d.sector).map(([sector, sectorRows]) => ({
            name: sector,
            children: sectorRows.map(r => ({
            name: r.skill,
            value: r.usage_volume,
            })),
        })),
        };

        type SkillNode = {
            name: string;
            value?: number;
            children?: SkillNode[];
        };

        const root = d3
            .hierarchy<SkillNode>(data)
            .sum(d => d.value || 0)
            .sort((a, b) => (b.value ?? 0) - (a.value ?? 0));

        const maxValue = d3.max(root.descendants(), d => d.value) || 1;

        const color = d3.scaleSequential()
            .domain([0, Math.sqrt(maxValue)])
            .interpolator(d3.interpolateBlues);

        const packedRoot = d3.pack<SkillNode>()
            .size([width, height])
            .padding(3)(root)

        let focus = packedRoot;
        let view: [number, number, number] = [
            packedRoot.x,
            packedRoot.y,
            packedRoot.r * 2
            ];    

        const svg = d3
            .select(svgRef.current)
        // const svg = d3
        //     .select<SVGSVGElement, unknown>("svg")
            .attr('width', width)
            .attr('height', height)
            .attr('viewBox', `0 0 ${width} ${height}`);
            // .style('background', '#f0f0f0'); // using container styling instead

        const nodes = svg
            .selectAll<SVGGElement, HierarchyCircularNode<SkillNode>>("g")
            .data(packedRoot.descendants())
            .join('g')
            .attr('transform', d => `translate(${d.x},${d.y})`)
            .on("click", (event, d) => {
                if (focus !== d) {
                zoom(event, d);
                event.stopPropagation();
                }
            });

        svg.on("click", (event) => zoom(event, packedRoot));

        nodes
            .append('circle')
            .attr('r', d => d.r)
            .attr("fill", d => color(Math.sqrt(d.value || 0)))
            .attr('stroke', '#fff')
            .attr('stroke-width', 1.2)
            .attr("fill-opacity", 0.9);

        nodes
            .append("text")
            // .filter(d => d.r > 20)
            .filter(d => !d.children && d.r > 18) // only leaf nodes (skills)
            .text(d => d.data.name)
            .attr("text-anchor", "middle")
            .attr("dy", "0.35em")
            .attr("font-size", d => Math.max(10,Math.min(d.r / 2.5, 28)))
            .style("fill", "#111")
            .style("pointer-events", "none")
            .style("cursor", "pointer");  

        let tooltip: d3.Selection<HTMLDivElement, unknown, HTMLElement, any> =
            d3.select<HTMLDivElement, unknown>('#skill-tooltip');

        if (tooltip.empty()) {
            tooltip = d3
                .select<HTMLDivElement, unknown>('body')
                .append('div')
                .attr('id', 'skill-tooltip')
                .style('position', 'absolute')
                .style('background', 'rgba(0,0,0,0.7)')
                .style('color', '#fff')
                .style('padding', '5px 10px')
                .style('border-radius', '4px')
                .style('pointer-events', 'none')
                .style('opacity', 0);
            }

        nodes
            .on('mouseover', (event, d) => {
                tooltip
                .style('opacity', 1)
                .html(
                    d.children
                        ? `<strong>${d.data.name}</strong>`
                        : `<strong>${d.data.name}</strong><br/>Sector: ${d.parent?.data.name}<br/>Employees: ${d.value}`
                    );
            })
            .on('mousemove', event => {
                tooltip
                    .style('left', event.pageX + 10 + 'px')
                    .style('top', event.pageY + 10 + 'px');
            })
            .on('mouseout', () => {
                tooltip.style('opacity', 0);
            })
            .on("mouseenter", function () {
                d3.select(this).select("circle")
                .attr("stroke-width", 3);
            })
            .on("mouseleave", function () {
                d3.select(this).select("circle")
                .attr("stroke-width", 1.2);
            });

        function zoom(
            event: d3.D3ZoomEvent<SVGSVGElement, unknown>,
            d: d3.HierarchyCircularNode<SkillNode>
            ) {
            focus = d;

            nodes
                .transition()
                .duration(750)
                .tween("zoom", () => {
                    const i = d3.interpolateZoom(view, [
                    focus.x,
                    focus.y,
                    focus.r * 2
                    ]);
                    return t => zoomTo(i(t));
            });

            // nodes
            //     .transition(transition)
            //     .attr("transform", node =>
            //     `translate(${(node.x - focus.x) * (width / (focus.r * 2)) + width / 2},
            //                 ${(node.y - focus.y) * (height / (focus.r * 2)) + height / 2})`
            //     );

            // nodes
            //     .select("circle")
            //     .transition(transition)
            //     .attr("r", node => node.r * (width / (focus.r * 2)));
        }
        
        function zoomTo(v: [number, number, number]) {
            const k = width / v[2];
            view = v;

            nodes.attr("transform", d =>
                `translate(${(d.x - v[0]) * k + width / 2},
                           ${(d.y - v[1]) * k + height / 2})`
            );

            nodes.select("circle").attr("r", d => d.r * k);

            nodes.select("text")
                .attr("font-size", d => Math.max(10, Math.min((d.r * k) / 2.5, 32)));
        }
        // zoomTo([packedRoot.x, packedRoot.y, packedRoot.r * 2]);
        zoomTo(view);
    }

    useEffect(() => {
        fetchSkillVolumes()
        .then((rows: SkillRow[]) => {
            renderChart(rows);
        })
        .catch(console.error);
    }, []);
  

    return (
        <div className="bg-gray-800 shadow rounded-lg p-6 w-full">
        <h2 className="text-xl text-zinc-200 font-bold mb-4">Building Design Skills by Primary Sector</h2>
        <svg ref={svgRef} className="w-full h-[1100px]"></svg>
        </div>
    );
}