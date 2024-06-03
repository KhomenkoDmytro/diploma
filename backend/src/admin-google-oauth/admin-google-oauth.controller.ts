import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './utils/google-auth.guard';
import { AdminGoogleOauthService } from './admin-google-oauth.service';
import { Request } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('google-oauth')
@Controller('admin-google-oauth')
export class AdminGoogleOauthController {
  constructor(private readonly googleOauthService: AdminGoogleOauthService) {}
  @ApiOperation({summary: 'Google oauth (do it in browser)'})
  @Get('login')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {}

  @ApiOperation({summary: 'Google oauth (do it in browser)'})
  @Get('redirect')
  @UseGuards(GoogleAuthGuard)
  async handleRedirect(@Request() req) {
    return this.googleOauthService.createAccessToken(req.user);
  }
}
