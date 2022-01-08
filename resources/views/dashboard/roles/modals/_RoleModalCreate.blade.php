<div class="modal fade" id="modal-create-role" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Create New role</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>

            <form action="{{ route('roles.store' )}}" method="post">
                <div class="modal-body">
                    @csrf
                    @method('POST')
                    <div class="form-group">
                        <input type="text" class="form-control" name="name">
                    </div>
                    <div class="row">
                        @foreach ( config('abilities') as $able => $value)
                            <div class="col-4 ">
                                <p class="badge bg-primary">{{ $able }}</p>
                                <div class="w-100">
                                    @foreach ($value as $key => $val)
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" name="abilities[]"
                                                   value="{{ $key }}">
                                            <label class="form-check-label">
                                                {{ $val }}
                                            </label>
                                        </div>
                                    @endforeach
                                </div>
                                <br>
                            </div>
                        @endforeach
                    </div>
                    @if ($errors->storeRole->any())
                        @foreach ($errors->storeRole->all() as $error)
                            <div class="text-danger">{{$error}}</div>
                        @endforeach
                    @endif

                </div>
                <div class="modal-footer justify-content-between">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Save changes</button>
                </div>
            </form>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
