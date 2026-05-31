import { useEffect, useRef } from 'react';
import batarangSrc from '../assets/Batman/Batarang.jpg';

export default function BatTransition({ onDone }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const ctx = canvas.getContext('2d');
        const W = canvas.width, H = canvas.height;
        const CX = W / 2, CY = H / 2;

        // ── Batarang image → gold transparent silhouette ───────────
        let batarangCanvas = null;
        const batImg = new Image();
        batImg.src = batarangSrc;
        batImg.onload = () => {
            batarangCanvas = document.createElement('canvas');
            batarangCanvas.width = batImg.width;
            batarangCanvas.height = batImg.height;
            const bCtx = batarangCanvas.getContext('2d');
            bCtx.drawImage(batImg, 0, 0);
            const id = bCtx.getImageData(0, 0, batImg.width, batImg.height);
            const d = id.data;
            for (let i = 0; i < d.length; i += 4) {
                const brightness = (d[i] * 0.299 + d[i + 1] * 0.587 + d[i + 2] * 0.114);
                // White bg → transparent, dark shape → opaque gold
                const alpha = Math.pow(Math.max(0, (255 - brightness) / 255), 1.4) * 255;
                d[i]     = 245;   // gold R
                d[i + 1] = 197;   // gold G
                d[i + 2] = 24;    // gold B
                d[i + 3] = alpha | 0;
            }
            bCtx.putImageData(id, 0, 0);
        };

        function drawBatarang(x, y, w, alpha) {
            if (!batarangCanvas) return;
            const aspect = batarangCanvas.height / batarangCanvas.width;
            const h = w * aspect;
            ctx.save();
            ctx.globalAlpha = alpha;
            // Layered glow: draw blurred copy first for bloom
            ctx.shadowColor = 'rgba(245,197,24,0.95)';
            ctx.shadowBlur = 60;
            ctx.drawImage(batarangCanvas, x - w / 2, y - h / 2, w, h);
            // Sharper second pass
            ctx.shadowBlur = 20;
            ctx.drawImage(batarangCanvas, x - w / 2, y - h / 2, w, h);
            ctx.restore();
        }

        // ── Film grain texture ──────────────────────────────────────
        const grainCanvas = document.createElement('canvas');
        grainCanvas.width = 256; grainCanvas.height = 256;
        const gCtx = grainCanvas.getContext('2d');
        function regenerateGrain() {
            const id = gCtx.createImageData(256, 256);
            for (let i = 0; i < id.data.length; i += 4) {
                const v = Math.random() * 28 | 0;
                id.data[i] = id.data[i + 1] = id.data[i + 2] = v;
                id.data[i + 3] = 22;
            }
            gCtx.putImageData(id, 0, 0);
        }
        regenerateGrain();

        // ── Rain ────────────────────────────────────────────────────
        const rainDrops = Array.from({ length: 180 }, () => ({
            x: Math.random() * W * 1.5 - W * 0.25,
            y: Math.random() * H - H,
            len: 12 + Math.random() * 40,
            speed: 14 + Math.random() * 22,
            alpha: 0.04 + Math.random() * 0.14,
            width: 0.35 + Math.random() * 0.7,
        }));

        // ── Buildings ───────────────────────────────────────────────
        // Each: { x, y (top as fraction), w, hasAntenna, layer }
        const buildingDefs = [
            // Mid layer
            { x: 0.00, y: 0.70, w: 0.045, ant: false, layer: 1 },
            { x: 0.04, y: 0.63, w: 0.030, ant: true,  layer: 1 },
            { x: 0.06, y: 0.72, w: 0.050, ant: false, layer: 1 },
            { x: 0.10, y: 0.60, w: 0.035, ant: true,  layer: 1 },
            { x: 0.13, y: 0.68, w: 0.055, ant: false, layer: 1 },
            { x: 0.18, y: 0.56, w: 0.038, ant: true,  layer: 1 },
            { x: 0.21, y: 0.71, w: 0.045, ant: false, layer: 1 },
            { x: 0.25, y: 0.64, w: 0.035, ant: false, layer: 1 },
            { x: 0.28, y: 0.73, w: 0.055, ant: false, layer: 1 },
            { x: 0.33, y: 0.58, w: 0.038, ant: true,  layer: 1 },
            { x: 0.36, y: 0.67, w: 0.048, ant: false, layer: 1 },
            { x: 0.40, y: 0.53, w: 0.030, ant: true,  layer: 1 },
            { x: 0.42, y: 0.71, w: 0.055, ant: false, layer: 1 },
            { x: 0.47, y: 0.61, w: 0.038, ant: false, layer: 1 },
            { x: 0.50, y: 0.69, w: 0.048, ant: true,  layer: 1 },
            { x: 0.54, y: 0.55, w: 0.038, ant: false, layer: 1 },
            { x: 0.57, y: 0.72, w: 0.055, ant: false, layer: 1 },
            { x: 0.62, y: 0.61, w: 0.038, ant: true,  layer: 1 },
            { x: 0.65, y: 0.68, w: 0.048, ant: false, layer: 1 },
            { x: 0.69, y: 0.57, w: 0.038, ant: true,  layer: 1 },
            { x: 0.72, y: 0.71, w: 0.055, ant: false, layer: 1 },
            { x: 0.77, y: 0.63, w: 0.038, ant: false, layer: 1 },
            { x: 0.80, y: 0.69, w: 0.048, ant: true,  layer: 1 },
            { x: 0.84, y: 0.60, w: 0.038, ant: false, layer: 1 },
            { x: 0.87, y: 0.73, w: 0.055, ant: false, layer: 1 },
            { x: 0.92, y: 0.66, w: 0.038, ant: true,  layer: 1 },
            { x: 0.95, y: 0.70, w: 0.050, ant: false, layer: 1 },
            // Foreground silhouette
            { x: 0.00, y: 0.78, w: 0.070, ant: false, layer: 2 },
            { x: 0.06, y: 0.82, w: 0.050, ant: false, layer: 2 },
            { x: 0.10, y: 0.76, w: 0.080, ant: false, layer: 2 },
            { x: 0.17, y: 0.80, w: 0.060, ant: false, layer: 2 },
            { x: 0.22, y: 0.75, w: 0.070, ant: false, layer: 2 },
            { x: 0.28, y: 0.82, w: 0.050, ant: false, layer: 2 },
            { x: 0.32, y: 0.77, w: 0.075, ant: false, layer: 2 },
            { x: 0.39, y: 0.80, w: 0.058, ant: false, layer: 2 },
            { x: 0.44, y: 0.76, w: 0.068, ant: false, layer: 2 },
            { x: 0.50, y: 0.79, w: 0.050, ant: false, layer: 2 },
            { x: 0.54, y: 0.74, w: 0.078, ant: false, layer: 2 },
            { x: 0.61, y: 0.81, w: 0.058, ant: false, layer: 2 },
            { x: 0.66, y: 0.77, w: 0.068, ant: false, layer: 2 },
            { x: 0.72, y: 0.80, w: 0.050, ant: false, layer: 2 },
            { x: 0.76, y: 0.75, w: 0.078, ant: false, layer: 2 },
            { x: 0.83, y: 0.79, w: 0.058, ant: false, layer: 2 },
            { x: 0.88, y: 0.76, w: 0.068, ant: false, layer: 2 },
            { x: 0.94, y: 0.80, w: 0.058, ant: false, layer: 2 },
        ];

        // Pre-generate windows
        const buildingWindows = buildingDefs.map(b => {
            const bH = (1 - b.y) * H;
            const bW = b.w * W;
            const cols = Math.max(2, Math.floor(bW / 13));
            const rows = Math.max(3, Math.floor(bH / 18));
            const wins = [];
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    if (Math.random() < 0.3) {
                        wins.push({
                            r, c,
                            lit: Math.random() < 0.45,
                            flicker: Math.random() < 0.08,
                            flickerSpeed: 0.008 + Math.random() * 0.015,
                            phase: Math.random() * Math.PI * 2,
                        });
                    }
                }
            }
            return { cols, rows, wins };
        });

        // ── Spotlight state ─────────────────────────────────────────
        let beamAngle = -0.3;

        // ── Dust particles in beam ──────────────────────────────────
        const dustParticles = Array.from({ length: 55 }, (_, i) => ({
            t: Math.random(),
            offset: (Math.random() - 0.5) * 60,
            size: 0.6 + Math.random() * 1.8,
            speed: 0.00008 + Math.random() * 0.00015,
            alpha: 0.15 + Math.random() * 0.5,
            phase: i * 0.4,
        }));

        // ── Lightning ───────────────────────────────────────────────
        let lightningFlash = 0;
        let nextLightning = 0.14 + Math.random() * 0.18;
        const lightningTimes = [];
        // Pre-schedule 3-4 lightning strikes
        let lt = nextLightning;
        for (let i = 0; i < 4; i++) {
            lightningTimes.push(lt);
            lt += 0.10 + Math.random() * 0.22;
            if (lt > 0.72) break;
        }

        // ── Fog layers ──────────────────────────────────────────────
        const fogLayers = [
            { y: 0.62, spd: 0.12, alpha: 0.07, h: 0.07, off: 0 },
            { y: 0.70, spd: -0.09, alpha: 0.11, h: 0.09, off: W * 0.35 },
            { y: 0.78, spd: 0.07, alpha: 0.14, h: 0.11, off: W * 0.65 },
        ];

        // ── Flocking mini bats ──────────────────────────────────────
        function drawMiniBat(x, y, size, angle, flapAmt, alpha) {
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.scale(size, size * (0.45 + flapAmt * 0.55));
            ctx.fillStyle = '#c9a200';
            ctx.beginPath();
            ctx.moveTo(0, 2);
            ctx.bezierCurveTo(4, 0, 12, -1, 16, 4);
            ctx.bezierCurveTo(12, 2, 6, 3, 5, 6);
            ctx.bezierCurveTo(3, 4, 1, 3, 0, 4);
            ctx.bezierCurveTo(-1, 3, -3, 4, -5, 6);
            ctx.bezierCurveTo(-6, 3, -12, 2, -16, 4);
            ctx.bezierCurveTo(-12, -1, -4, 0, 0, 2);
            ctx.fill();
            ctx.restore();
        }

        const bats = Array.from({ length: 45 }, (_, i) => {
            const side = Math.random() < 0.5 ? -1 : 1;
            return {
                x: CX + side * (80 + Math.random() * 420),
                y: CY + (Math.random() - 0.5) * 320,
                vx: side * (0.25 + Math.random() * 1.0),
                vy: -(0.35 + Math.random() * 1.1),
                size: 0.09 + Math.random() * 0.32,
                angle: Math.random() * Math.PI * 2,
                spin: (Math.random() - 0.5) * 0.055,
                flapPhase: Math.random() * Math.PI * 2,
                delay: i / 45,
                alpha: 0,
            };
        });

        let startTime = null;
        const DURATION = 4600;
        let raf;
        let grainTick = 0;

        function tick(ts) {
            if (!startTime) startTime = ts;
            const elapsed = ts - startTime;
            const p = Math.min(elapsed / DURATION, 1);

            // ── Sky ──────────────────────────────────────────────────
            const fadeIn = p < 0.1 ? p / 0.1 : 1;
            const sky = ctx.createLinearGradient(0, 0, 0, H);
            sky.addColorStop(0, `rgba(1,1,5,${0.98 * fadeIn})`);
            sky.addColorStop(0.55, `rgba(3,5,12,${0.96 * fadeIn})`);
            sky.addColorStop(1, `rgba(5,7,16,${0.94 * fadeIn})`);
            ctx.fillStyle = sky;
            ctx.fillRect(0, 0, W, H);

            // ── Lightning flash ──────────────────────────────────────
            const activeLightning = lightningTimes.some(lt => p > lt && p < lt + 0.06);
            if (activeLightning) {
                const ltIdx = lightningTimes.findIndex(lt => p > lt && p < lt + 0.06);
                const ltP = (p - lightningTimes[ltIdx]) / 0.06;
                const ltAlpha = Math.sin(ltP * Math.PI) * 0.22;
                ctx.fillStyle = `rgba(210,225,255,${ltAlpha})`;
                ctx.fillRect(0, 0, W, H);
                lightningFlash = ltAlpha;
            } else {
                lightningFlash = 0;
            }

            // ── Gotham skyline ───────────────────────────────────────
            const cityAlpha = p < 0.08 ? 0 : Math.min((p - 0.08) / 0.14, 1);
            if (cityAlpha > 0) {
                ctx.save();
                ctx.globalAlpha = cityAlpha;
                buildingDefs.forEach((b, i) => {
                    const bx = b.x * W;
                    const by = b.y * H;
                    const bw = b.w * W;
                    const bh = (1 - b.y) * H;
                    const isFg = b.layer === 2;

                    // Building body
                    ctx.fillStyle = isFg ? '#04040a' : '#070712';
                    ctx.fillRect(bx, by, bw, bh + 2);

                    // Antenna
                    if (b.ant) {
                        ctx.fillStyle = isFg ? '#03030a' : '#06060f';
                        ctx.fillRect(bx + bw * 0.44, by - bh * 0.07, bw * 0.07, bh * 0.07);
                        // Red blinking light
                        const blinkAlpha = lightningFlash > 0 ? 0.9 : (0.5 + Math.sin(elapsed * 0.0018 + i * 1.7) * 0.45);
                        ctx.fillStyle = `rgba(255,40,40,${blinkAlpha})`;
                        ctx.beginPath();
                        ctx.arc(bx + bw * 0.475, by - bh * 0.07, 1.8, 0, Math.PI * 2);
                        ctx.fill();
                        // Red glow
                        ctx.save();
                        ctx.globalAlpha = blinkAlpha * 0.3;
                        const rg = ctx.createRadialGradient(bx + bw * 0.475, by - bh * 0.07, 0, bx + bw * 0.475, by - bh * 0.07, 12);
                        rg.addColorStop(0, 'rgba(255,60,60,1)');
                        rg.addColorStop(1, 'rgba(255,60,60,0)');
                        ctx.fillStyle = rg;
                        ctx.beginPath();
                        ctx.arc(bx + bw * 0.475, by - bh * 0.07, 12, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.restore();
                    }

                    // Windows (only mid-layer buildings)
                    if (!isFg) {
                        const wd = buildingWindows[i];
                        const colW = bw / wd.cols;
                        const rowH = (bh * 0.88) / wd.rows;
                        wd.wins.forEach(win => {
                            if (!win.lit) return;
                            const wx = bx + win.c * colW + colW * 0.18;
                            const wy = by + bh * 0.04 + win.r * rowH + rowH * 0.12;
                            const ww = colW * 0.64;
                            const wh = rowH * 0.68;
                            let wA = win.flicker
                                ? (0.45 + Math.sin(elapsed * win.flickerSpeed + win.phase) * 0.32)
                                : 0.52;
                            // Lightning lights up all windows
                            if (lightningFlash > 0) wA = Math.min(1, wA + lightningFlash * 2);
                            ctx.fillStyle = `rgba(255,228,130,${wA * 0.42})`;
                            ctx.fillRect(wx, wy, ww, wh);
                        });

                        // Subtle wet-edge glimmer
                        ctx.fillStyle = 'rgba(80,110,180,0.05)';
                        ctx.fillRect(bx, by, 1.2, bh);
                        ctx.fillRect(bx + bw - 1.2, by, 1.2, bh);
                    }
                });
                ctx.restore();
            }

            // ── Fog ──────────────────────────────────────────────────
            if (p > 0.09 && p < 0.88) {
                const fogAlpha = Math.min((p - 0.09) / 0.16, 1) * Math.max(1 - (p - 0.78) / 0.1, 0);
                fogLayers.forEach(fog => {
                    fog.off += fog.spd;
                    const fx = ((fog.off % W) + W) % W;
                    const fy = fog.y * H;
                    const fh = fog.h * H;
                    ctx.save();
                    ctx.globalAlpha = fog.alpha * fogAlpha;
                    const fg = ctx.createLinearGradient(0, fy - fh, 0, fy + fh * 1.5);
                    fg.addColorStop(0, 'transparent');
                    fg.addColorStop(0.45, 'rgba(15,24,44,1)');
                    fg.addColorStop(1, 'transparent');
                    ctx.fillStyle = fg;
                    ctx.fillRect(W - fx, fy - fh, W, fh * 2.5);
                    ctx.fillRect(-fx, fy - fh, W, fh * 2.5);
                    ctx.restore();
                });
            }

            // ── Spotlight ────────────────────────────────────────────
            if (p < 0.76) {
                const beamProg = Math.min(p / 0.28, 1);
                beamAngle = -0.3 + beamProg * 0.3;
                const beamAlpha = Math.min(beamProg * 0.55, 0.55) * (1 - Math.max((p - 0.56) / 0.2, 0));

                if (beamAlpha > 0.005) {
                    const bxEnd = CX + Math.sin(beamAngle) * H * 1.3;
                    const spread = Math.tan(0.17) * (H + 80);

                    // Wide outer volumetric glow
                    const outerG = ctx.createRadialGradient(CX, -70, 0, bxEnd, H + 100, 700);
                    outerG.addColorStop(0, `rgba(245,197,24,${beamAlpha * 0.55})`);
                    outerG.addColorStop(0.45, `rgba(245,197,24,${beamAlpha * 0.1})`);
                    outerG.addColorStop(1, 'rgba(245,197,24,0)');
                    ctx.save();
                    ctx.fillStyle = outerG;
                    ctx.beginPath();
                    ctx.moveTo(CX, -70);
                    ctx.lineTo(bxEnd - spread * 1.8, H + 80);
                    ctx.lineTo(bxEnd + spread * 1.8, H + 80);
                    ctx.closePath();
                    ctx.fill();

                    // Core bright beam
                    const coreG = ctx.createLinearGradient(CX, -70, bxEnd, H);
                    coreG.addColorStop(0, `rgba(255,245,180,${beamAlpha * 0.85})`);
                    coreG.addColorStop(0.4, `rgba(245,197,24,${beamAlpha * 0.2})`);
                    coreG.addColorStop(1, 'rgba(245,197,24,0.015)');
                    ctx.fillStyle = coreG;
                    ctx.beginPath();
                    ctx.moveTo(CX, -70);
                    ctx.lineTo(bxEnd - spread * 0.28, H + 80);
                    ctx.lineTo(bxEnd + spread * 0.28, H + 80);
                    ctx.closePath();
                    ctx.fill();
                    ctx.restore();

                    // Lens flare at projector source
                    if (beamAlpha > 0.08) {
                        const flareR = ctx.createRadialGradient(CX, -70, 0, CX, -70, 90);
                        flareR.addColorStop(0, `rgba(255,252,210,${Math.min(beamAlpha * 1.8, 1)})`);
                        flareR.addColorStop(0.25, `rgba(245,197,24,${beamAlpha * 0.6})`);
                        flareR.addColorStop(0.7, `rgba(245,197,24,${beamAlpha * 0.12})`);
                        flareR.addColorStop(1, 'rgba(245,197,24,0)');
                        ctx.save();
                        ctx.fillStyle = flareR;
                        ctx.beginPath();
                        ctx.arc(CX, -70, 90, 0, Math.PI * 2);
                        ctx.fill();
                        // Streak lines from flare
                        ctx.globalAlpha = beamAlpha * 0.25;
                        ctx.strokeStyle = 'rgba(255,245,180,1)';
                        ctx.lineWidth = 0.8;
                        for (let a = 0; a < Math.PI * 2; a += Math.PI / 5) {
                            ctx.beginPath();
                            ctx.moveTo(CX + Math.cos(a) * 8, -70 + Math.sin(a) * 8);
                            ctx.lineTo(CX + Math.cos(a) * 55, -70 + Math.sin(a) * 55);
                            ctx.stroke();
                        }
                        ctx.restore();
                    }

                    // Dust motes in beam
                    dustParticles.forEach(d => {
                        d.t = (d.t + d.speed * elapsed * 0.001) % 1;
                        const dt = d.t;
                        const dx = CX + Math.sin(beamAngle) * H * dt + d.offset * (0.2 + dt * 0.8);
                        const dy = -70 + (H + 150) * dt;
                        const inBeamX = Math.abs(dx - (CX + Math.sin(beamAngle) * H * dt));
                        if (inBeamX > spread * 1.1) return;
                        const moteAlpha = d.alpha * beamAlpha * Math.sin(dt * Math.PI) * 0.9;
                        ctx.save();
                        ctx.globalAlpha = moteAlpha;
                        ctx.fillStyle = 'rgba(255,235,160,1)';
                        ctx.beginPath();
                        ctx.arc(dx, dy, d.size, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.restore();
                    });
                }
            }

            // ── Rain ────────────────────────────────────────────────
            const rainA = p < 0.08 ? 0 : p > 0.80 ? Math.max(1 - (p - 0.80) / 0.09, 0) : 1;
            if (rainA > 0) {
                ctx.save();
                rainDrops.forEach(d => {
                    d.y += d.speed;
                    d.x -= d.speed * 0.19;
                    if (d.y > H + d.len) {
                        d.y = -d.len;
                        d.x = Math.random() * W * 1.5 - W * 0.25;
                    }
                    ctx.globalAlpha = d.alpha * rainA;
                    ctx.strokeStyle = 'rgba(160,205,255,1)';
                    ctx.lineWidth = d.width;
                    ctx.beginPath();
                    ctx.moveTo(d.x, d.y);
                    ctx.lineTo(d.x - 4.5, d.y + d.len);
                    ctx.stroke();
                });
                ctx.restore();
            }

            // ── Batarang logo ────────────────────────────────────────
            const logoP = Math.max(0, Math.min((p - 0.26) / 0.26, 1));
            const logoAlpha = logoP * (1 - Math.max((p - 0.74) / 0.2, 0));
            if (logoAlpha > 0.005) {
                // Atmospheric halo ring
                if (logoP > 0.25) {
                    const haloA = Math.min((logoP - 0.25) / 0.35, 1) * logoAlpha;
                    const halo = ctx.createRadialGradient(CX, CY - 15, 40, CX, CY - 15, 220);
                    halo.addColorStop(0, `rgba(245,197,24,${haloA * 0.18})`);
                    halo.addColorStop(0.45, `rgba(245,197,24,${haloA * 0.05})`);
                    halo.addColorStop(1, 'rgba(245,197,24,0)');
                    ctx.save();
                    ctx.fillStyle = halo;
                    ctx.beginPath();
                    ctx.arc(CX, CY - 15, 220, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();
                }
                // Scale: batarang is wide, so use pixel width not scale factor
                const logoWidth = (240 + logoP * 120) * Math.min(W / 900, 1.4);
                drawBatarang(CX, CY - 20, logoWidth, logoAlpha);

                // "BATMAN" title below
                if (p > 0.44) {
                    const tA = Math.min((p - 0.44) / 0.14, 1) * Math.max(1 - (p - 0.76) / 0.14, 0);
                    if (tA > 0.005) {
                        ctx.save();
                        ctx.globalAlpha = tA;
                        const fontSize = Math.round(9 + logoP * 5);
                        ctx.font = `100 ${fontSize}px 'Cinzel', serif`;
                        ctx.fillStyle = '#f5c518';
                        ctx.textAlign = 'center';
                        ctx.shadowColor = 'rgba(245,197,24,0.7)';
                        ctx.shadowBlur = 28;
                        ctx.fillText('BATMAN', CX, CY + 108);

                        // Decorative lines flanking the text
                        ctx.globalAlpha = tA * 0.45;
                        ctx.strokeStyle = 'rgba(245,197,24,0.6)';
                        ctx.lineWidth = 0.5;
                        const lw = 90 + logoP * 30;
                        ctx.beginPath(); ctx.moveTo(CX - lw - 18, CY + 91); ctx.lineTo(CX - 18, CY + 91); ctx.stroke();
                        ctx.beginPath(); ctx.moveTo(CX + 18, CY + 91); ctx.lineTo(CX + lw + 18, CY + 91); ctx.stroke();

                        // Sub-caption
                        ctx.globalAlpha = tA * 0.5;
                        ctx.font = `100 ${Math.round(6 + logoP * 2)}px 'Cinzel', serif`;
                        ctx.fillStyle = 'rgba(245,197,24,0.55)';
                        ctx.shadowBlur = 0;
                        ctx.fillText('THE DARK KNIGHT', CX, CY + 128);
                        ctx.restore();
                    }
                }
            }

            // ── Mini bats dispersing ─────────────────────────────────
            if (p > 0.50) {
                bats.forEach(b => {
                    const bStart = 0.50 + b.delay * 0.20;
                    if (p < bStart) return;
                    const bP = Math.min((p - bStart) / 0.30, 1);
                    b.alpha = bP * (1 - Math.max(bP - 0.65, 0) / 0.35);
                    if (b.alpha < 0.005) return;
                    b.x += b.vx * 2.4;
                    b.y += b.vy * 2.4;
                    b.angle += b.spin;
                    const flap = Math.abs(Math.sin(elapsed * 0.008 + b.flapPhase));
                    drawMiniBat(b.x, b.y, b.size, b.angle, flap, b.alpha * 0.72);
                });
            }

            // ── Film grain ───────────────────────────────────────────
            grainTick++;
            if (grainTick % 2 === 0) regenerateGrain();
            ctx.save();
            ctx.globalAlpha = 0.32;
            ctx.globalCompositeOperation = 'screen';
            for (let gx = 0; gx < W; gx += 256) {
                for (let gy = 0; gy < H; gy += 256) {
                    ctx.drawImage(grainCanvas, gx, gy);
                }
            }
            ctx.restore();

            // ── Vignette ─────────────────────────────────────────────
            const vig = ctx.createRadialGradient(CX, CY, H * 0.2, CX, CY, H * 0.85);
            vig.addColorStop(0, 'rgba(0,0,0,0)');
            vig.addColorStop(1, 'rgba(0,0,0,0.65)');
            ctx.fillStyle = vig;
            ctx.fillRect(0, 0, W, H);

            // ── Fade to black ────────────────────────────────────────
            if (p > 0.83) {
                const blackness = Math.pow((p - 0.83) / 0.17, 1.5);
                if (p > 0.84 && p < 0.91) {
                    const flashP = Math.sin(((p - 0.84) / 0.07) * Math.PI);
                    ctx.fillStyle = `rgba(245,197,24,${flashP * 0.07})`;
                    ctx.fillRect(0, 0, W, H);
                }
                ctx.fillStyle = `rgba(0,0,0,${blackness})`;
                ctx.fillRect(0, 0, W, H);
            }

            if (p < 1) {
                raf = requestAnimationFrame(tick);
            } else {
                cancelAnimationFrame(raf);
                onDone();
            }
        }

        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [onDone]);

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: '#01010a', overflow: 'hidden'
        }}>
            <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
        </div>
    );
}
