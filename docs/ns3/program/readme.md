### Nord Stage 3 Program file mapping


The mapping corresponds to the Nord Stage 3 program file (file extension ns3f).

The file version used is 3.04 (generated with OS v2.54), and the file length is 592 bytes.

Some older versions have a length of 574 bytes and a smaller header. Offset 0x04 defines the file format.



| offset   | bits       | description
| :---:    |   :----:   | :---
| `0x0000` | `cccccccc` | ascii 'C' 0x43, 4-byte Clavia ID
| `0x0001` | `cccccccc` | ascii 'B' 0x42
| `0x0002` | `cccccccc` | ascii 'I' 0x49
| `0x0003` | `cccccccc` | ascii 'N' 0x4E
| `0x0004` | `ffffffff` | [(f) file format](api.md#file-format)
| `0x0005` | `--------` | 0
| `0x0006` | `--------` | 0
| `0x0007` | `--------` | 0
| `0x0008` | `cccccccc` | ascii 'n' 0x6E, 4-byte NS3 Program file ID
| `0x0009` | `cccccccc` | ascii 's' 0x73,
| `0x000A` | `cccccccc` | ascii '3' 0x33,
| `0x000B` | `cccccccc` | ascii 'f' 0x66,
| `0x000C` | `bbbbbbbb` | (b) bank lsb (0 = A, 1 = B...)
| `0x000D` | `--------` | 0
| `0x000E` | `llllllll` | (l) location lsb (0 = 11, 1 = 12...)
| `0x000F` | `--------` | 0
| `0x0010` | `cccccccc` | [(c) program category](api.md#program-category)
| `0x0011` | `--------` |
| `0x0012` | `--------` |
| `0x0013` | `--------` |
| `0x0014` | `iiiiiiii` | [(i) file version](api.md#file-version) (16-bit)
| `0x0015` | `iiiiiiii` |
| `0x0016` | `--------` |
| `0x0017` | `--------` |
| `0x0018` | `cccccccc` | CRC1 (32-bit)
| `0x0019` | `cccccccc` |
| `0x001A` | `cccccccc` |
| `0x001B` | `cccccccc` |
| `0x001C` | `--------` |
| `0x001D` | `--------` |
| `0x001E` | `--------` |
| `0x001F` | `--------` |
| `0x0020` | `--------` |
| `0x0021` | `--------` |
| `0x0022` | `--------` |
| `0x0023` | `--------` |
| `0x0024` | `--------` |
| `0x0025` | `--------` |
| `0x0026` | `--------` |
| `0x0027` | `--------` |
| `0x0028` | `--------` |
| `0x0029` | `--------` |
| `0x002A` | `--------` |
| `0x002B` | `--------` |
| `0x002C` | `--------` | 0
| `0x002D` | `--------` | 0
| `0x002E` | `vvvvvvvv` | version 16-bit integer value in Big Endian format
| `0x002F` | `vvvvvvvv` |
| `0x0030` | `--------` | 11
| `0x0031` | `pppsssss` | [(p) panel](api.md#panel-enabled-and-selection), [(s) split](api.md#split)
| `0x0032` | `ssssssss` |
| `0x0033` | `ssssssss` |
| `0x0034` | `sddpvvvr` | [(d) piano layer detune](api.md#piano-layer-detune), [(p) organ pitch stick](api.md#organ-pitch-stick), [(v) organ vibrato mode](api.md#organ-vibrato-mode), [(r) rotary speaker speed](api.md#rotary-speaker-speed)
| `0x0035` | `mwwwaaap` | [(m) rotary speaker stop mode](api.md#rotary-speaker-stop-mode), [(w) rotary speaker speed morph wheel](api.md#rotary-speaker-speed), [(a) rotary speaker speed morph after touch](api.md#rotary-speaker-speed), [(p) rotary speaker speed morph control pedal](api.md#rotary-speaker-speed)
| `0x0036` | `pp------` |
| `0x0037` | `--------` |
| `0x0038` | `tttttccc` | [(t) transpose](api.md#transpose), [(c) master clock rate](api.md#master-clock-rate)
| `0x0039` | `cccccddd` | [(d) rotary speaker drive](api.md#rotary-speaker-drive)
| `0x003A` | `dddd----` |
| `0x003B` | `--------` |
| `0x003C` | `--------` |
| `0x003D` | `--------` |
| `0x003E` | `--------` |
| `0x003F` | `--------` |
| `0x0040` | `--------` |
| `0x0041` | `--------` |
| `0x0042` | `--------` |
| `0x0043` | `ozzzzvvv` | [(o) piano on](api.md#piano-on), [(z) piano kb zone](api.md#piano-kb-zone), [(v) piano volume](api.md#piano-volume)
| `0x0044` | `vvvvwwww` | [(w) piano volume morph wheel](api.md#piano-volume)
| `0x0045` | `wwwwaaaa` | [(a) piano volume morph after touch](api.md#piano-volume)
| `0x0046` | `aaaapppp` | [(p) piano volume morph control pedal](api.md#piano-volume)
| `0x0047` | `pppp-ooo` | [(o) piano octave shift](api.md#piano-octave-shift)
| `0x0048` | `pstttmmm` | [(p) piano pitch stick](api.md#piano-pitch-stick), [(s) piano sustain pedal](api.md#piano-sustain-pedal), [(t) piano type](api.md#piano-type), [(m) piano model](api.md#piano-model)
| `0x0049` | `mmvviiii` | [(v) piano sample variation](api.md#piano-model), [(i) piano sample name](api.md#piano-model)
| `0x004A` | `iiiiiiii` |
| `0x004B` | `iiiiiiii` |
| `0x004C` | `iiiiiiii` |
| `0x004D` | `iiiisrpk` | [(s) piano soft release](api.md#piano-soft-release),[(r) piano string resonance](api.md#piano-string-resonance), [(p) piano pedal noise](api.md#piano-pedal-noise), [(k) piano kb touch](api.md#piano-kb-touch)
| `0x004E` | `k-ttt---` | [(t) piano timbre](api.md#piano-timbre)
| `0x004F` | `--------` |
| `0x0050` | `--------` |
| `0x0051` | `--------` |
| `0x0052` | `ozzzzvvv` | [(o) synth on](api.md#synth-on), [(z) synth kb zone](api.md#synth-kb-zone), [(v) synth volume](api.md#synth-volume)
| `0x0053` | `vvvvwwww` | [(w) synth volume morph wheel](api.md#synth-volume)
| `0x0054` | `wwwwaaaa` | [(a) synth volume morph after touch](api.md#synth-volume)
| `0x0055` | `aaaapppp` | [(p) synth volume morph control pedal](api.md#synth-volume)
| `0x0056` | `pppp-ooo` | [(o) synth octave shift](api.md#synth-octave-shift)
| `0x0057` | `ps--xxxx` | [(p) synth pitch stick](api.md#synth-pitch-stick), [(s) synth sustain pedal](api.md#synth-sustain-pedal), (x) user sample header 1
| `0x0058` | `xxxxxxxx` | user sample header 2
| `0x0059` | `xxxxxxxx` | user sample name 1
| `0x005A` | `xxxxxxxx` | user sample name 2
| `0x005B` | `xxxxxxxx` | user sample name 3
| `0x005C` | `xxxxxxxx` | user sample name 4
| `0x005D` | `xxxxxxxx` | user sample name 5
| `0x005E` | `xxxxxxxx` | user sample name 6
| `0x005F` | `xxxxxxxx` | user sample name 7
| `0x0060` | `xxxxxxxx` | user sample name 8
| `0x0061` | `xxxxxxxx` | user sample name 9
| `0x0062` | `xxxxxxxx` | user sample name 10
| `0x0063` | `xxxxxxxx` | user sample name 11
| `0x0064` | `xxxxxxxx` | user sample name 12
| `0x0065` | `xxxxxxxx` | user sample name 13
| `0x0066` | `xxxxxxxx` | user sample name 14
| `0x0067` | `xxxxxxxx` | user sample name 15
| `0x0068` | `xxxxxxxx` | user sample name 16
| `0x0069` | `xxxxxxxx` | user sample name 17
| `0x006A` | `xxxxxxxx` | user sample name 18
| `0x006B` | `xxxxxxxx` | user sample name 19
| `0x006C` | `xxxxxxxx` | user sample name 20
| `0x006D` | `--------` |
| `0x006E` | `--------` |
| `0x006F` | `--------` |
| `0x0070` | `--------` |
| `0x0071` | `--------` |
| `0x0072` | `--------` |
| `0x0073` | `--------` |
| `0x0074` | `--------` |
| `0x0075` | `--------` |
| `0x0076` | `--------` |
| `0x0077` | `--------` |
| `0x0078` | `--------` |
| `0x0079` | `--------` |
| `0x007A` | `--------` |
| `0x007B` | `--------` |
| `0x007C` | `--------` |
| `0x007D` | `--------` |
| `0x007E` | `--------` |
| `0x007F` | `--------` |
| `0x0080` | `hosrrppc` | [(h) synth kh hold](api.md#synth-kb-hold), [(o) synth arp on](api.md#synth-arp-on), [(o) synth arp kb sync](api.md#synth-arp-kb-sync), [(r) synth arp range](api.md#synth-arp-range), [(p) synth arp pattern](api.md#synth-arp-pattern), [(c) synth arp master clock](api.md#synth-arp-master-clock)
| `0x0081` | `rrrrrrrw` | [(r) synth arp rate](api.md#synth-arp-rate), [(w) synth arp rate morph wheel](api.md#synth-arp-rate)
| `0x0082` | `wwwwwwwa` | [(a) synth arp rate morph after touch](api.md#synth-arp-rate)
| `0x0083` | `aaaaaaap` | [(p) synth arp rate morph control pedal](api.md#synth-arp-rate)
| `0x0084` | `pppppppv` | [(v) synth voice](api.md#synth-voice)
| `0x0085` | `vggggggg` | [(g) synth glide](api.md#synth-glide)
| `0x0086` | `uuvvvlll` | [(g) synth unison](api.md#synth-unison), [(v) synth vibrato](api.md#synth-vibrato), [(l) synth lfo wave](api.md#synth-lfo-wave)
| `0x0087` | `mrrrrrrr` | [(m) synth lfo master clock](api.md#synth-lfo-master-clock), [(r) synth lfo rate](api.md#synth-lfo-rate)
| `0x0088` | `wwwwwwww` | [(w) synth lfo rate morph wheel](api.md#synth-lfo-rate)
| `0x0089` | `aaaaaaaa` | [(a) synth lfo rate morph after touch](api.md#synth-lfo-rate)
| `0x008A` | `pppppppp` | [(r) synth lfo rate control pedal](api.md#synth-lfo-rate)
| `0x008B` | `aaaaaaad` | [(a) synth mod env attack](api.md#synth-mod-env-attack), [(d) synth mod env decay](api.md#synth-mod-env-decay)
| `0x008C` | `ddddddrr` | [(a) synth mod env release](api.md#synth-mod-env-release)
| `0x008D` | `rrrrrvtt` | [(v) synth mod env velocity](api.md#synth-mod-env-velocity), [(t) synth oscillator type](api.md#synth-oscillator-type)
| `0x008E` | `twwwwwww` | [(w) synth oscillator 1 wave form](api.md#synth-oscillator-1-wave-form)
| `0x008F` | `ww-ccccp` | [(c) synth oscillator config](api.md#synth-oscillator-config), [(c) synth pitch](api.md#synth-pitch)
| `0x0090` | `ppppplll` | [(l) synth oscillator control](api.md#synth-oscillator-control)
| `0x0091` | `llllwwww` | [(w) synth oscillator control morph wheel](api.md#synth-oscillator-control)
| `0x0092` | `wwwwaaaa` | [(a) synth oscillator control morph after touch](api.md#synth-oscillator-control)
| `0x0093` | `aaaapppp` | [(p) synth oscillator control morph control pedal](api.md#synth-oscillator-control)
| `0x0094` | `ppppllll` | [(l) synth lfo mod env](api.md#synth-lfo-mod-env)
| `0x0095` | `lllwwwww` | [(w) synth lfo mod env morph wheel](api.md#synth-lfo-mod-env)
| `0x0096` | `wwwaaaaa` | [(a) synth lfo mod env morph after touch](api.md#synth-lfo-mod-env)
| `0x0097` | `aaappppp` | [(p) synth lfo mod env morph control pedal](api.md#synth-lfo-mod-env)
| `0x0098` | `ppptttff` | [(t) synth filter type](api.md#synth-filter-type), [(f) synth filter freq](api.md#synth-filter-freq)
| `0x0099` | `fffffwww` | [(w) synth filter freq morph wheel](api.md#synth-filter-freq)
| `0x009A` | `wwwwwaaa` | [(a) synth filter freq morph after touch](api.md#synth-filter-freq)
| `0x009B` | `aaaaappp` | [(p) synth filter freq morph control pedal](api.md#synth-filter-freq)
| `0x009C` | `ppppphhh` | [(h) synth filter hp freq res](api.md#synth-filter-hp-freq-res)
| `0x009D` | `hhhhwwww` | [(w) synth filter hp freq res morph wheel](api.md#synth-filter-hp-freq-res)
| `0x009E` | `wwwwaaaa` | [(a) synth filter hp freq res morph after touch](api.md#synth-filter-hp-freq-res)
| `0x009F` | `aaaapppp` | [(p) synth filter hp freq res morph control pedal](api.md#synth-filter-hp-freq-res)
| `0x00A0` | `ppppllll` | [(l) synth filter lfo amount](api.md#synth-filter-lfo-amount)
| `0x00A1` | `lllwwwww` | [(w) synth filter lfo amount morph wheel](api.md#synth-filter-lfo-amount)
| `0x00A2` | `wwwaaaaa` | [(a) synth filter lfo amount morph after touch](api.md#synth-filter-lfo-amount)
| `0x00A3` | `aaappppp` | [(p) synth filter lfo amount morph control pedal](api.md#synth-filter-lfo-amount)
| `0x00A4` | `pppmmmmm` | [(m) synth filter vel mod env amount](api.md#synth-filter-vel-mod-env-amount)
| `0x00A5` | `mmttddaa` | [(t) synth filter kb track](api.md#synth-filter-kb-track), [(d) synth filter drive](api.md#synth-filter-drive), [(a) synth amp env attack](api.md#synth-amp-env-attack)
| `0x00A6` | `aaaaaddd` | [(d) synth amp env decay](api.md#synth-amp-env-decay)
| `0x00A7` | `ddddrrrr` | [(r) synth amp env release](api.md#synth-amp-env-release)
| `0x00A8` | `rrrvvsss` | [(r) synth amp env velocity](api.md#synth-amp-env-velocity), [(s) synth sample id](api.md#synth-sample-id)
| `0x00A9` | `ssssssss` |
| `0x00AA` | `ssssssss` |
| `0x00AB` | `ssssssss` |
| `0x00AC` | `sssssf--` | [(f) synth fast attack](api.md#synth-fast-attack)
| `0x00AD` | `--------` | '0'
| `0x00AE` | `--------` | '0'
| `0x00AF` | `--------` | '0'
| `0x00B0` | `--------` | '0'
| `0x00B1` | `--------` | '0'
| `0x00B2` | `--------` | '0'
| `0x00B3` | `--------` | '0'
| `0x00B4` | `--------` | '0'
| `0x00B5` | `--------` | '07'
| `0x00B6` | `ozzzzvvv` | [(o) organ on](api.md#organ-on), [(z) organ kb zone](api.md#organ-kb-zone), [(v) organ volume](api.md#organ-volume)
| `0x00B7` | `vvvvwwww` | [(w) organ volume morph wheel](api.md#organ-volume)
| `0x00B8` | `wwwwaaaa` | [(a) organ volume morph after touch](api.md#organ-volume)
| `0x00B9` | `aaaapppp` | [(p) organ volume morph control pedal](api.md#organ-volume)
| `0x00BA` | `pppp-ooo` | [(o) organ octave shift](api.md#organ-octave-shift)
| `0x00BB` | `stttl---` | [(s) organ sustain-pedal](api.md#organ-sustain-pedal),[(t) organ type](api.md#organ-type),[(l) organ live mode](api.md#organ-live-mode)
| `0x00BC` | `--------` | '0'
| `0x00BD` | `--------` | '1A'
| `0x00BE` | `1111wwww` | [organ preset 1 drawbar (1)](api.md#organ-drawbars-preset-1), [(w) organ preset 1 drawbar 1 morph wheel](api.md#organ-drawbars-preset-1)
| `0x00BF` | `waaaaapp` | [(a) organ preset 1 drawbar 1 morph after touch](api.md#organ-drawbars-preset-1), [(p) organ preset 1 drawbar 2 morph control pedal](api.md#organ-drawbars-preset-1)
| `0x00C0` | `ppp2222w` | [organ preset 1 drawbar (2)](api.md#organ-drawbars-preset-1), [(w) organ preset 1 drawbar 2 morph wheel](api.md#organ-drawbars-preset-1)
| `0x00C1` | `wwwwaaaa` | [(a) organ preset 1 drawbar 2 morph after touch](api.md#organ-drawbars-preset-1)
| `0x00C2` | `appppp33` | [(p) organ preset 1 drawbar 2 morph control pedal](api.md#organ-drawbars-preset-1), [organ preset 1 drawbar (3)](api.md#organ-drawbars-preset-1),
| `0x00C3` | `33wwwwwa` | [(w) organ preset 1 drawbar 3 morph wheel](api.md#organ-drawbars-preset-1), [(a) organ preset 1 drawbar 3 morph after touch](api.md#organ-drawbars-preset-1)
| `0x00C4` | `aaaapppp` | [(p) organ preset 1 drawbar 3 morph control pedal](api.md#organ-drawbars-preset-1)
| `0x00C5` | `p4444www` | [organ preset 1 drawbar (4)](api.md#organ-drawbars-preset-1), [(w) organ preset 1 drawbar 4 morph wheel](api.md#organ-drawbars-preset-1)
| `0x00C6` | `wwaaaaap` | [(a) organ preset 1 drawbar 4 morph after touch](api.md#organ-drawbars-preset-1), [(p) organ preset 1 drawbar 4 morph control pedal](api.md#organ-drawbars-preset-1),
| `0x00C7` | `pppp5555` | [organ preset 1 drawbar (5)](api.md#organ-drawbars-preset-1),
| `0x00C8` | `wwwwwaaa` | [(w) organ preset 1 drawbar 5 morph wheel](api.md#organ-drawbars-preset-1), [(a) organ preset 1 drawbar 5 morph after touch](api.md#organ-drawbars-preset-1)
| `0x00C9` | `aappppp6` | [(p) organ preset 1 drawbar 5 morph control pedal](api.md#organ-drawbars-preset-1), [organ preset 1 drawbar (6)](api.md#organ-drawbars-preset-1),
| `0x00CA` | `666wwwww` | [(w) organ preset 1 drawbar 6 morph wheel](api.md#organ-drawbars-preset-1)
| `0x00CB` | `aaaaappp` | [(a) organ preset 1 drawbar 6 morph after touch](api.md#organ-drawbars-preset-1), [(p) organ preset 1 drawbar 6 morph control pedal](api.md#organ-drawbars-preset-1)
| `0x00CC` | `pp7777ww` | [organ preset 1 drawbar (7)](api.md#organ-drawbars-preset-1), [(w) organ preset 1 drawbar 7 morph wheel](api.md#organ-drawbars-preset-1)
| `0x00CD` | `wwwaaaaa` | [(a) organ preset 1 drawbar 7 morph after touch](api.md#organ-drawbars-preset-1)
| `0x00CE` | `ppppp888` | [(p) organ preset 1 drawbar 7 morph control pedal](api.md#organ-drawbars-preset-1), [organ preset 1 drawbar (8)](api.md#organ-drawbars-preset-1),
| `0x00CF` | `8wwwwwaa` | [(w) organ preset 1 drawbar 8 morph wheel](api.md#organ-drawbars-preset-1), [(a) organ preset 1 drawbar 8 morph after touch](api.md#organ-drawbars-preset-1)
| `0x00D0` | `aaappppp` | [(p) organ preset 1 drawbar 8 morph control pedal](api.md#organ-drawbars-preset-1)
| `0x00D1` | `9999wwww` | [organ preset 1 drawbar (9)](api.md#organ-drawbars-preset-1), [(w) organ preset 1 drawbar 9 morph wheel](api.md#organ-drawbars-preset-1)
| `0x00D2` | `waaaaapp` | [(a) organ preset 1 drawbar 9 morph after touch](api.md#organ-drawbars-preset-1), [(p) organ preset 1 drawbar 9 morph control pedal](api.md#organ-drawbars-preset-1)
| `0x00D3` | `pppvphds` | [(v) organ vibrato on](api.md#organ-vibrato-on), [(p) organ percussion on](api.md#organ-percussion-on), [(h) organ percussion harmonic third](api.md#organ-percussion-harmonic-third), [(d) organ percussion decay fast](api.md#organ-percussion-decay-fast), [(s) organ percussion volume soft](api.md#organ-percussion-volume-soft)
| `0x00D4` | `--------` | '0'
| `0x00D5` | `--------` | '0'
| `0x00D6` | `--------` | '0'
| `0x00D7` | `--------` | '0'
| `0x00D8` | `--------` | '1A'
| `0x00D9` | `1111wwww` | [organ preset 2 drawbar (1)](api.md#organ-drawbars-preset-2), [(w) organ preset 2 drawbar 1 morph wheel](api.md#organ-drawbars-preset-2)
| `0x00DA` | `waaaaapp` | [(a) organ preset 2 drawbar 1 morph after touch](api.md#organ-drawbars-preset-2), [(p) organ preset 2 drawbar 2 morph control pedal](api.md#organ-drawbars-preset-2)
| `0x00DB` | `ppp2222w` | [organ preset 2 drawbar (2)](api.md#organ-drawbars-preset-2), [(w) organ preset 2 drawbar 2 morph wheel](api.md#organ-drawbars-preset-2)
| `0x00DC` | `wwwwaaaa` | [(a) organ preset 2 drawbar 2 morph after touch](api.md#organ-drawbars-preset-2)
| `0x00DE` | `appppp33` | [(p) organ preset 2 drawbar 2 morph control pedal](api.md#organ-drawbars-preset-2), [organ preset 2 drawbar (3)](api.md#organ-drawbars-preset-2),
| `0x00DF` | `33wwwwwa` | [(w) organ preset 2 drawbar 3 morph wheel](api.md#organ-drawbars-preset-2), [(a) organ preset 2 drawbar 3 morph after touch](api.md#organ-drawbars-preset-2)
| `0x00E0` | `aaaapppp` | [(p) organ preset 2 drawbar 3 morph control pedal](api.md#organ-drawbars-preset-2)
| `0x00E1` | `p4444www` | [organ preset 2 drawbar (4)](api.md#organ-drawbars-preset-2), [(w) organ preset 2 drawbar 4 morph wheel](api.md#organ-drawbars-preset-2)
| `0x00E2` | `wwaaaaap` | [(a) organ preset 2 drawbar 4 morph after touch](api.md#organ-drawbars-preset-2), [(p) organ preset 2 drawbar 4 morph control pedal](api.md#organ-drawbars-preset-2),
| `0x00E3` | `pppp5555` | [organ preset 2 drawbar (5)](api.md#organ-drawbars-preset-2),
| `0x00E4` | `wwwwwaaa` | [(w) organ preset 2 drawbar 5 morph wheel](api.md#organ-drawbars-preset-2), [(a) organ preset 2 drawbar 5 morph after touch](api.md#organ-drawbars-preset-2)
| `0x00E5` | `aappppp6` | [(p) organ preset 2 drawbar 5 morph control pedal](api.md#organ-drawbars-preset-2), [organ preset 2 drawbar (6)](api.md#organ-drawbars-preset-2),
| `0x00E6` | `666wwwww` | [(w) organ preset 2 drawbar 6 morph wheel](api.md#organ-drawbars-preset-2)
| `0x00E7` | `aaaaappp` | [(a) organ preset 2 drawbar 6 morph after touch](api.md#organ-drawbars-preset-2), [(p) organ preset 2 drawbar 6 morph control pedal](api.md#organ-drawbars-preset-2)
| `0x00E8` | `pp7777ww` | [organ preset 2 drawbar (7)](api.md#organ-drawbars-preset-2), [(w) organ preset 2 drawbar 7 morph wheel](api.md#organ-drawbars-preset-2)
| `0x00E9` | `wwwaaaaa` | [(a) organ preset 2 drawbar 7 morph after touch](api.md#organ-drawbars-preset-2)
| `0x00EA` | `ppppp888` | [(p) organ preset 2 drawbar 7 morph control pedal](api.md#organ-drawbars-preset-2), [organ preset 2 drawbar (8)](api.md#organ-drawbars-preset-2),
| `0x00EB` | `8wwwwwaa` | [(w) organ preset 2 drawbar 8 morph wheel](api.md#organ-drawbars-preset-2), [(a) organ preset 2 drawbar 8 morph after touch](api.md#organ-drawbars-preset-2)
| `0x00EC` | `aaappppp` | [(p) organ preset 2 drawbar 8 morph control pedal](api.md#organ-drawbars-preset-2)
| `0x00ED` | `9999wwww` | [organ preset 2 drawbar (9)](api.md#organ-drawbars-preset-2), [(w) organ preset 2 drawbar 9 morph wheel](api.md#organ-drawbars-preset-2)
| `0x00EE` | `waaaaapp` | [(a) organ preset 2 drawbar 9 morph after touch](api.md#organ-drawbars-preset-2), [(p) organ preset 2 drawbar 9 morph control pedal](api.md#organ-drawbars-preset-2)
| `0x00EF` | `ppp-----` |
| `0x00F0` | `--------` |
| `0x00F1` | `--------` |
| `0x00F2` | `--------` |
| `0x00F3` | `--------` |
| `0x00F4` | `ozzz--ss` | [(o) extern on](api.md#extern-on), [(z) extern kb zone](api.md#extern-kb-zone), [(s) extern octave shift](api.md#extern-octave-shift)
| `0x00F5` | `s-------` |
| `0x00F6` | `ps----mm` | [(p) extern pitch stick](api.md#extern-pitch-stick), [(s) extern sustain pedal](api.md#extern-sustain-pedal), [(m) extern midi control](api.md#extern-midi-control)
| `0x00F7` | `-------v` | [(v) extern midi cc](api.md#extern-midi-cc)
| `0x00F8` | `vvvvvvww` | [(w) extern midi cc morph wheel](api.md#extern-midi-cc)
| `0x00F9` | `wwwwwwaa` | [(a) extern midi cc morph after touch](api.md#extern-midi-cc)
| `0x00FA` | `aaaaaapp` | [(p) extern midi cc morph control pedal](api.md#extern-midi-cc)
| `0x00FB` | `pppppp--` |
| `0x00FC` | `--------` |
| `0x00FD` | `-------v` | [(v) extern midi program](api.md#extern-midi-program)
| `0x00FE` | `wwwwwwaa` | [(a) extern midi program after touch](api.md#extern-midi-program)
| `0x00FF` | `aaaaaapp` | [(p) extern midi program control pedal](api.md#extern-midi-program)
| `0x0100` | `pppppp--` |
| `0x0101` | `-------v` | [(v) extern volume](api.md#extern-volume)
| `0x0102` | `vvvvvvww` | [(w) extern volume morph wheel](api.md#extern-volume)
| `0x0103` | `wwwwwwaa` | [(a) extern volume morph after touch](api.md#extern-volume)
| `0x0104` | `aaaaaapp` | [(p) extern volume morph control pedal](api.md#extern-volume)
| `0x0105` | `pppppp--` |
| `0x0106` | `--------` |
| `0x0107` | `--------` |
| `0x0108` | `--------` |
| `0x0109` | `--------` |
| `0x010A` | `--------` |
| `0x010B` | `ossnrrtt` | [(o) rotary speaker on](api.md#rotary-speaker-on), [(s) rotary speaker source](api.md#rotary-speaker-source), [(n) effect 1 on](api.md#effect-1-on), [(r) effect-1-source](api.md#effect-1-source), [(t) effect 1 type](api.md#effect-1-type)
| `0x010C` | `tcrrrrrr` | [(c) effect 1 master clock](api.md#effect-1-master-clock), [(r) effect 1 rate](api.md#effect-1-rate)
| `0x010D` | `rwwwwwww` | [(w) effect 1 rate morph wheel](api.md#effect-1-rate)
| `0x010E` | `waaaaaaa` | [(a) effect 1 rate morph after touch](api.md#effect-1-rate)
| `0x010F` | `appppppp` | [(p) effect 1 rate morph control pedal](api.md#effect-1-rate)
| `0x0110` | `paaaaaaa` | [(a) effect 1 amount](api.md#effect-1-amount)
| `0x0111` | `wwwwwwww` | [(w) effect 1 amount morph wheel](api.md#effect-1-amount)
| `0x0112` | `aaaaaaaa` | [(a) effect 1 amount morph after touch](api.md#effect-1-amount)
| `0x0113` | `pppppppp` | [(p) effect 1 amount morph control pedal](api.md#effect-1-amount)
| `0x0114` | `osstttrr` | [(o) effect 2 on](api.md#effect-2-on), [(s) effect 2 source](api.md#effect-2-source), [(t) effect 2 type](api.md#effect-2-type), [(r) effect 2 rate](api.md#effect-2-rate)
| `0x0115` | `rrrrraaa` | [(a) effect 2 amount](api.md#effect-2-amount)
| `0x0116` | `aaaawwww` | [(w) effect 2 amount morph wheel](api.md#effect-2-amount)
| `0x0117` | `wwwwaaaa` | [(a) effect 2 amount after touch](api.md#effect-2-amount)
| `0x0118` | `aaaapppp` | [(p) effect 2 amount control pedal](api.md#effect-2-amount)
| `0x0119` | `pppp----` |
| `0x011A` | `--------` |
| `0x011B` | `--------` |
| `0x011C` | `--------` |
| `0x011D` | `--------` |
| `0x011E` | `--------` |
| `0x011F` | `--------` |
| `0x0120` | `--------` |
| `0x0121` | `--------` |
| `0x0122` | `--------` |
| `0x0123` | `--------` |
| `0x0124` | `--------` |
| `0x0125` | `--------` |
| `0x0126` | `--------` |
| `0x0127` | `--------` |
| `0x0128` | `--------` |
| `0x0129` | `--------` |
| `0x012A` | `--------` |
| `0x012B` | `--------` |
| `0x012C` | `--------` |
| `0x012D` | `--------` |
| `0x012E` | `--------` |
| `0x012F` | `--------` |
| `0x0130` | `--------` |
| `0x0131` | `--------` |
| `0x0132` | `--------` |
| `0x0133` | `--------` |
| `0x0134` | `------ot` | [(o) reverb on](api.md#reverb-on), [(t) reverb type](api.md#reverb-type)
| `0x0135` | `ttbrrrrr` | [(o) reverb bright](api.md#reverb-bright), [(r) reverb amount](api.md#reverb-amount)
| `0x0136` | `rrwwwwww` | [(w) reverb amount morph wheel](api.md#reverb-amount)
| `0x0137` | `wwaaaaaa` | [(a) reverb amount morph after touch](api.md#reverb-amount)
| `0x0138` | `aapppppp` | [(p) reverb amount morph control pedal](api.md#reverb-amount)
| `0x0139` | `ppoccccc` | [(o) compressor on](api.md#compressor-on), [(c) compressor amount](api.md#compressor-amount)
| `0x013A` | `ccf-----` | [(f) compressor fast](api.md#compressor-fast)
| `0x013B` | `--------` | Piano Panel B, same as offset 0x34, offset from Panel A is 0x107 (263 bytes)
| `0x013C` | `--------` |
| `...`    |            |
| `0x0240` | `--------` |
| `0x0241` | `--------` | end of Panel B
| `0x0242` | `--------` | 0
| `0x0243` | `--------` | 0
| `0x0244` | `--------` | 0
| `0x0245` | `--------` | 0
| `0x0246` | `--------` | 0
| `0x0247` | `--------` | 0
| `0x0248` | `--------` | 0
| `0x0249` | `--------` | 0
| `0x024A` | `--------` | 5
| `0x024B` | `--------` | 0
| `0x024C` | `--------` | 0
| `0x024D` | `--------` | 0
| `0x024E` | `--------` | 0
| `0x024F` | `--------` | 0

EOF

```