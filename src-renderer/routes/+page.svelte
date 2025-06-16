<script lang="ts">
  import * as Resizable from "$lib/components/ui/resizable";
  import { WebglAddon } from "@xterm/addon-webgl";
  import { FitAddon } from "@xterm/addon-fit";
  import { WebLinksAddon } from "@xterm/addon-web-links";
  import type { Terminal } from "@xterm/xterm";
  import "@xterm/xterm/css/xterm.css";
  import { onMount } from "svelte";

  let terminal: Terminal;
  let RConsoleContainer = $state<HTMLDivElement>();

  onMount(async () => {
    const { Terminal } = await import("@xterm/xterm");
    const fitAddon = new FitAddon();
    terminal = new Terminal();
    terminal.loadAddon(new WebglAddon());
    terminal.loadAddon(new WebLinksAddon());
    terminal.loadAddon(fitAddon);
    fitAddon.fit();
    if (RConsoleContainer) {
      terminal.open(RConsoleContainer);

      terminal.onData(data => {
        window.writeToTerm(data);
      });
      window.termToRenderer((value) => {
        terminal.write(value);
      });
    } else {
      alert("Console Parent not found");
    }
  });
</script>

<div class="h-full">
  <Resizable.PaneGroup direction="horizontal" autoSaveId="workspace__layout">
    <Resizable.Pane minSize={30} maxSize={60}>
      <div bind:this={RConsoleContainer} class="h-full"></div>
    </Resizable.Pane>
    <Resizable.Handle withHandle />
    <Resizable.Pane>Two</Resizable.Pane>
  </Resizable.PaneGroup>
</div>
